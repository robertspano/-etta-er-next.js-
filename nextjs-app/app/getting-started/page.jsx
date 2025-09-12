'use client';

import React from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';
import { 
  BookOpen, FileText, Eye, UserCheck, Shield, Star, 
  AlertTriangle, Book, HelpCircle, Mail, MessageCircle,
  CheckCircle, ArrowRight, Clock, Users, DollarSign
} from 'lucide-react';

const GettingStartedPage = () => {
  const { language, translations } = useTranslations();

  const steps = [
    {
      number: "1",
      title: language === 'is' ? 'Settu inn verkefni' : 'Submit Project',
      description: language === 'is' 
        ? 'Lýstu því sem á að gera og bættu við myndum ef hægt er.'
        : 'Describe what needs to be done and add photos if possible.',
      icon: <FileText className="w-6 h-6" />
    },
    {
      number: "2", 
      title: language === 'is' ? 'Berðu saman tilboð' : 'Compare Quotes',
      description: language === 'is' 
        ? 'Skoðaðu verð, tímaáætlun og umsagnir.'
        : 'Review prices, timeline and reviews.',
      icon: <Eye className="w-6 h-6" />
    },
    {
      number: "3",
      title: language === 'is' ? 'Veldu verktaka og hefjið verkið' : 'Choose Contractor and Start',
      description: language === 'is' 
        ? 'Haltu samskiptum innan kerfisins og fylgstu með framvindu.'
        : 'Keep communication within the system and track progress.',
      icon: <UserCheck className="w-6 h-6" />
    }
  ];

  const faqs = [
    {
      question: language === 'is' ? 'Hvað kostar að nota Verki?' : 'What does it cost to use Verki?',
      answer: language === 'is' 
        ? 'Birting verkefna er án skuldbindingar. Þjónustugjöld geta átt við eftir þjónustu.'
        : 'Publishing projects is without obligation. Service fees may apply after service.'
    },
    {
      question: language === 'is' ? 'Hve mörg tilboð fæ ég?' : 'How many quotes do I get?',
      answer: language === 'is' 
        ? 'Yfirleitt tvö til fimm, fer eftir svæði og tegund verks.'
        : 'Usually two to five, depends on area and type of work.'
    },
    {
      question: language === 'is' ? 'Er ég skuldbundinn þegar ég set inn verk?' : 'Am I committed when I submit a project?',
      answer: language === 'is' 
        ? 'Nei, þú velur bara ef tilboð hentar.'
        : 'No, you only choose if the quote suits you.'
    },
    {
      question: language === 'is' ? 'Hver sér gögnin mín?' : 'Who sees my data?',
      answer: language === 'is' 
        ? 'Verktakar sem sækja um verkefnið og þjónustuteymi eftir þörfum.'
        : 'Contractors who apply for the project and service team as needed.'
    },
    {
      question: language === 'is' ? 'Má breyta verkbeiðni eftir birtingu?' : 'Can I change the project request after publishing?',
      answer: language === 'is' 
        ? 'Já, en láttu verktaka vita um breytingar.'
        : 'Yes, but let contractors know about changes.'
    },
    {
      question: language === 'is' ? 'Hvernig loka ég verki?' : 'How do I close a project?',
      answer: language === 'is' 
        ? 'Staðfestu verklok, ljúktu greiðslum og skildu eftir umsögn.'
        : 'Confirm project completion, finish payments and leave a review.'
    }
  ];

  const glossaryTerms = [
    {
      term: language === 'is' ? 'Tilboð' : 'Quote',
      definition: language === 'is' 
        ? 'Formlegt verð og umfang fyrir tiltekið verk.'
        : 'Formal price and scope for a specific job.'
    },
    {
      term: language === 'is' ? 'Verklýsing' : 'Job Description', 
      definition: language === 'is' 
        ? 'Skýr lýsing á því sem á að vinna og hvaða efni á að nota.'
        : 'Clear description of what needs to be done and what materials to use.'
    },
    {
      term: language === 'is' ? 'Ábyrgð' : 'Warranty',
      definition: language === 'is' 
        ? 'Tími og skilyrði sem verktaki ber ábyrgð á verkinu.'
        : 'Time and conditions for which the contractor is responsible for the work.'
    },
    {
      term: language === 'is' ? 'Áfangagreiðsla' : 'Milestone Payment',
      definition: language === 'is' 
        ? 'Greiðsla eftir að ákveðnum hluta verks er lokið.'
        : 'Payment after a certain part of the work is completed.'
    }
  ];

  return (
    <div className="min-h-screen bg-light_cyan pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-federal_blue rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' ? 'Byrjendahandbók fyrir einstaklinga' : 'Getting Started Guide for Individuals'}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'is' 
              ? 'Fyrir þá sem nota Verki í fyrsta sinn. Hér finnur þú stutt skref, gagnleg ráð og tengla á nánari leiðbeiningar.'
              : 'For those using Verki for the first time. Here you will find short steps, useful tips and links to detailed instructions.'
            }
          </p>
        </div>

        {/* How Verki Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'is' ? 'Svona virkar Verki' : 'How Verki Works'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-federal_blue text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {step.number}
                    </div>
                    <div className="w-10 h-10 bg-federal_blue-100 rounded-full flex items-center justify-center text-federal_blue">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          
          {/* Writing a Good Request */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-honolulu_blue-100 rounded-full flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-honolulu_blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'is' ? 'Skrifaðu góða verkbeiðni' : 'Write a Good Project Request'}
              </h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Segðu nákvæmlega hvað á að gera, hvar og hvenær.'
                    : 'Say exactly what needs to be done, where and when.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Lýstu ástandi, efni sem þarf og aðstæðum á staðnum.'
                    : 'Describe the condition, materials needed and conditions on site.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Hladdu upp myndum og mælingum ef þær liggja fyrir.'
                    : 'Upload photos and measurements if available.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-semibold">
                  {language === 'is' 
                    ? 'Betri lýsing skilar betri tilboðum.'
                    : 'Better description results in better quotes.'
                  }
                </span>
              </li>
            </ul>
          </div>

          {/* Comparing Quotes */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'is' ? 'Berðu saman tilboð' : 'Compare Quotes'}
              </h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Skoðaðu hvað er innifalið í verði. Er efni innifalið eða aðeins vinna.'
                    : 'See what is included in the price. Is material included or just labor.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Berðu saman tímalínu, upphaf og verklok.'
                    : 'Compare timeline, start and completion.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Athugaðu ábyrgðir, tryggingar og hvort skráður sé staðgengill.'
                    : 'Check warranties, insurance and if a substitute is registered.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-semibold">
                  {language === 'is' 
                    ? 'Veldu ekki bara lægsta verðið. Veldu besta heildartilboðið.'
                    : 'Don\'t just choose the lowest price. Choose the best overall offer.'
                  }
                </span>
              </li>
            </ul>
          </div>

          {/* Choose Right Contractor */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'is' ? 'Veldu réttan verktaka' : 'Choose the Right Contractor'}
              </h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Lestu umsagnir frá fyrri verkum.'
                    : 'Read reviews from previous projects.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Skoðaðu vottanir og tryggingar.'
                    : 'Review certifications and insurance.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <MessageCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Metaðu samskipti og svörun áður en þú samþykkir.'
                    : 'Evaluate communication and response before you approve.'
                  }
                </span>
              </li>
            </ul>
          </div>

          {/* Payments and Security */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'is' ? 'Greiðslur og öryggi' : 'Payments and Security'}
              </h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Hafið skriflegan samning um umfang, verð og greiðsluáætlun.'
                    : 'Have a written agreement on scope, price and payment schedule.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Greiddu ekki allt fyrirfram. Skiptið greiðslum eftir áföngum og afhendingu.'
                    : 'Don\'t pay everything upfront. Split payments by milestones and delivery.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Geymdu samskipti og kvittanir á einum stað.'
                    : 'Keep communications and receipts in one place.'
                  }
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Reviews Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 mb-16 border border-yellow-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {language === 'is' ? 'Umsagnir og gæðamat' : 'Reviews and Quality Assessment'}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-gray-700">
                {language === 'is' 
                  ? 'Gefðu heiðarlegt mat þegar verki lýkur.'
                  : 'Give an honest assessment when work is completed.'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-gray-700">
                {language === 'is' 
                  ? 'Umsagnir hjálpa öðrum notendum og hvetja til góðra verka.'
                  : 'Reviews help other users and encourage good work.'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-gray-700">
                {language === 'is' 
                  ? 'Verktakar sjá samantekt af einkunnum og athugasemdum.'
                  : 'Contractors see a summary of ratings and comments.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Problem Solving */}
        <div className="bg-red-50 rounded-xl p-8 mb-16 border border-red-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {language === 'is' ? 'Hvað ef eitthvað fer úrskeiðis' : 'What If Something Goes Wrong'}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <MessageCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Hafðu strax samband við verktaka og reyndu að leysa málið.'
                    : 'Contact the contractor immediately and try to resolve the issue.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <FileText className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Skráðu vandann með texta og myndum.'
                    : 'Document the problem with text and photos.'
                  }
                </span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Book className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Skoðaðu samninginn og pöntun til að sjá hvað var samið um.'
                    : 'Review the contract and order to see what was agreed upon.'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <HelpCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'is' 
                    ? 'Leitaðu aðstoðar ef mál leysist ekki með samtali.'
                    : 'Seek help if the matter is not resolved through conversation.'
                  }
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Glossary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-gray-100">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
              <Book className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {language === 'is' ? 'Orðalisti' : 'Glossary'}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {glossaryTerms.map((term, index) => (
              <div key={index} className="border-l-4 border-indigo-200 pl-6 py-3">
                <h4 className="font-semibold text-gray-900 mb-2">{term.term}</h4>
                <p className="text-gray-600 text-sm">{term.definition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-gray-100">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mr-4">
              <HelpCircle className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {language === 'is' ? 'Algengar spurningar' : 'Frequently Asked Questions'}
            </h3>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">
              {language === 'is' ? 'Hafðu samband' : 'Contact Us'}
            </h3>
          </div>
          
          <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
            {language === 'is' 
              ? 'Ef þú þarft aðstoð við að setja inn verkefni eða bera saman tilboð geturðu haft samband í netspjalli eða með tölvupósti. Þjónustutími er auglýstur á þjónustusíðu.'
              : 'If you need help submitting a project or comparing quotes, you can contact us via chat or email. Service hours are advertised on the service page.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:verki@verki.is" 
              className="inline-flex items-center bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Mail className="w-5 h-5 mr-2" />
              verki@verki.is
            </a>
            <a 
              href="/" 
              className="inline-flex items-center bg-white bg-opacity-20 text-white font-medium px-6 py-3 rounded-lg hover:bg-opacity-30 transition-colors duration-200"
            >
              <FileText className="w-5 h-5 mr-2" />
              {language === 'is' ? 'Byrja verkefni' : 'Start Project'}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GettingStartedPage;