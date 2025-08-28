import smtplib
import os
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart
from jinja2 import Template
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        # Email configuration (you would set these in .env)
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_username = os.getenv('SMTP_USERNAME', '')
        self.smtp_password = os.getenv('SMTP_PASSWORD', '')
        self.from_email = os.getenv('FROM_EMAIL', 'noreply@buildconnect.is')
        self.from_name = os.getenv('FROM_NAME', 'BuildConnect')
        
        # Base URL for login
        self.base_url = os.getenv('FRONTEND_URL', 'https://construction-hub-19.preview.emergentagent.com')
    
    def load_template(self, template_name: str) -> str:
        """Load email template from file"""
        template_path = Path(__file__).parent.parent / 'templates' / template_name
        try:
            with open(template_path, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            logger.error(f"Email template not found: {template_path}")
            return ""
    
    def render_template(self, template_content: str, **kwargs) -> str:
        """Render template with provided variables"""
        try:
            template = Template(template_content)
            return template.render(**kwargs)
        except Exception as e:
            logger.error(f"Error rendering template: {str(e)}")
            return ""
    
    def send_login_code_email(self, email: str, code: str, language: str = 'en') -> bool:
        """Send login code email"""
        try:
            # Load template
            template_content = self.load_template('login_code_email.html')
            if not template_content:
                logger.error("Failed to load email template")
                return False
            
            # Prepare template variables based on language
            if language == 'is':
                variables = {
                    'language': 'is',
                    'title': 'Innskráning án lykilorðs',
                    'message': f'Hér er innskráningarkóðinn þinn fyrir BuildConnect. Kóðinn er gildur í 15 mínútur.',
                    'code_label': 'Innskráningarkóði:',
                    'login_code': code,
                    'expiry_message': 'Kóðinn er gildur í 15 mínútur',
                    'button_text': 'Skrá inn',
                    'login_url': f'{self.base_url}/login-code?email={email}&code={code}',
                    'security_message': 'Ef þú baðst ekki um þennan kóða, geturðu hunsað þennan tölvupóst með góðri samvisku. Einhver annar kann að hafa slegið inn netfangið þitt fyrir mistök.',
                    'footer_message': 'Þessi tölvupóstur var sendur af BuildConnect vegna innskráningarbeiðni.',
                    'website_text': 'Heimasíða',
                    'website_url': self.base_url,
                    'support_text': 'Þjónustusver',
                    'support_url': f'{self.base_url}/support'
                }
                subject = 'Innskráning án lykilorðs - BuildConnect'
            else:
                variables = {
                    'language': 'en',
                    'title': 'Login without password',
                    'message': f'Here is your login code for BuildConnect. The code is valid for 15 minutes.',
                    'code_label': 'Login Code:',
                    'login_code': code,
                    'expiry_message': 'Code is valid for 15 minutes',
                    'button_text': 'Login',
                    'login_url': f'{self.base_url}/login-code?email={email}&code={code}',
                    'security_message': 'If you did not request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.',
                    'footer_message': 'This email was sent by BuildConnect due to a login request.',
                    'website_text': 'Website',
                    'website_url': self.base_url,
                    'support_text': 'Support',
                    'support_url': f'{self.base_url}/support'
                }
                subject = 'Login without password - BuildConnect'
            
            # Render template
            html_content = self.render_template(template_content, **variables)
            if not html_content:
                logger.error("Failed to render email template")
                return False
            
            # Create email message
            msg = MimeMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f'{self.from_name} <{self.from_email}>'
            msg['To'] = email
            
            # Add HTML content
            html_part = MimeText(html_content, 'html', 'utf-8')
            msg.attach(html_part)
            
            # Add plain text version
            plain_text = f"""
{variables['title']}

{variables['message']}

{variables['code_label']} {code}

{variables['expiry_message']}

{variables['button_text']}: {variables['login_url']}

{variables['security_message']}

---
{variables['footer_message']}
{variables['website_text']}: {variables['website_url']}
{variables['support_text']}: {variables['support_url']}
            """.strip()
            
            text_part = MimeText(plain_text, 'plain', 'utf-8')
            msg.attach(text_part)
            
            # Send email (for demo, we'll just log it)
            if self.smtp_username and self.smtp_password:
                # Send actual email
                with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)
                    logger.info(f"Login code email sent to {email}")
            else:
                # Demo mode - just log the email content
                logger.info(f"[DEMO] Login code email for {email}:")
                logger.info(f"Subject: {subject}")
                logger.info(f"Code: {code}")
                logger.info(f"HTML Content: {html_content[:200]}...")
                print(f"\n=== EMAIL SENT TO {email} ===")
                print(f"Subject: {subject}")
                print(f"Login Code: {code}")
                print(f"Valid for: 15 minutes")
                print(f"Login URL: {variables['login_url']}")
                print("="*50)
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to send login code email: {str(e)}")
            return False

# Global email service instance
email_service = EmailService()