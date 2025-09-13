'use client';

import React, { useState } from 'react';
import { useTranslations } from '../../contexts/TranslationsContext';
import { 
  Cookie, Shield, TrendingUp, Target, Settings, 
  CheckCircle, XCircle, Mail, Phone, Info, 
  Database, Lock, Eye, BarChart, Globe
} from 'lucide-react';

const CookieSettingsPage = () => {
  const { language, translations } = useTranslations();

  const [cookieSettings, setCookieSettings] = useState({
    required: true, // Always true, cannot be changed
    experience: false,
    marketing: false
  });

  const handleToggle = (category) => {
    if (category === 'required') return; // Cannot toggle required cookies
    
    setCookieSettings(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const cookieCategories = [
    {
      id: 'required',
      title: language === 'is' ? 'Nauðsynleg gögn' : 'Required data',
      description: language === 'is' 
        ? 'Þessar vafrakökur eru nauðsynlegar til að vefsíðan virki rétt; þú getur ekki slökkt á þeim án þess að síðan hætti að virka.'
        : 'These are absolutely necessary cookies for the website to function properly; you cannot turn them off without the site stopping working.',
      whatWeDo: language === 'is'
        ? 'Við geymum sumar vafrakökur til að tryggja örugga innskráningu í þjónustuna og koma í veg fyrir áras tölvuþrjóta. Að auki þurfum við að geyma val þitt um hvaða vafrakökur þú samþykkir og hverjar ekki. Þú getur lokað fyrir þessar í vafranum þínum, en það mun valda því að vefsíðan virki ekki.'
        : 'We store some cookies to, among other things, ensure secure login to the service and prevent attempted hacker attacks. In addition, we need to store the choices you make about which cookies you accept and which you do not. You can block these in your browser, but this will cause the website to not function.',
      enabled: cookieSettings.required,
      canToggle: false,
      icon: <Shield className="w-6 h-6" />,
      color: 'federal_blue'
    },
    {
      id: 'experience',
      title: language === 'is' ? 'Bæta upplifunina' : 'Improve the experience',
      description: language === 'is'
        ? 'Við viljum halda nafnlausum tölfræði um notkun vefsíðunnar svo við getum gert hana betri fyrir þig.'
        : 'We want to keep anonymous statistics on the use of the website so that we can make the website better for you.',
      whatWeDo: language === 'is'
        ? 'Þessar vafrakökur gera okkur kleift að sjá fjölda heimsókna, hvaða síður eru skoðaðar og hvaðan gestirnir koma, svo við getum mælt og bætt afköst vefsíðnanna. Dæmi um þetta er að við getum greint hversu margir hoppa út í skráningu verks svo við getum gert breytingar á skráningarforminu og gert þetta auðveldara fyrir notandann. Allar upplýsingar eru safnaðar og flokkaðar og verða að fullu nafnlausar. Með öðrum orðum, við lítum ekki á einstaklinga, heldur hvernig hópur gesta notar vefsíðuna. Ef þú vilt ekki samþykkja þessar vafrakökur munum við ekki vita hvort þú hefur heimsótt vefsíðuna og við munum ekki geta bætt þjónustuna.'
        : 'These cookies enable us to see the number of visits, which pages the visits come from and which sources the visitors come from, so that we can measure and improve the performance of the websites. An example of this is that we can analyze how many people drop out during the registration of a job so that we can make changes to the registration form and make this easier for the user. All information is collected and aggregated and will be completely anonymous. In other words, we do not look at individuals, but how a group of visitors use the website. If you do not want to accept these cookies, we will not know whether you have visited the website and we will not be able to improve the service.',
      enabled: cookieSettings.experience,
      canToggle: true,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'honolulu_blue'
    },
    {
      id: 'marketing',
      title: language === 'is' ? 'Markaðssetning' : 'Marketing',
      description: language === 'is'
        ? 'Við viljum sýna þér ráðlögð auglýsingar og efni byggð á nafnlausri notkun þessarar vefsíðu í Schibsted netinu og öðrum auglýsingavettvangi.'
        : 'We want to show you recommended ads and content based on anonymous use of this website in the Schibsted network and other advertising venues.',
      whatWeDo: language === 'is'
        ? 'Við gætum notað upplýsingar um það sem þú ert að horfa á, hvar þú ert staðsettur og hvaða markhóp þú ert í til að gera auglýsingar meira viðeigandi fyrir þína hagsmuni á Verki og öðrum Schibsted vefsíðum eins og VG.no og FINN.no, auk Google, Facebook og annarra. Ef þú segir nei, muntu samt fá auglýsingar, en þær verða tilviljunarkenndar. Schibsted Norge er stjórnandi markvissra auglýsinga.'
        : 'We may use information about what you are watching, where you are located and which target group you are in to make advertising more relevant to your interests on Verki and other Schibsted websites such as VG.no and FINN.no, in addition to Google, Facebook and others. If you say no, you will still receive advertising, but it will be random. Schibsted Norge is the controller for targeted advertising.',
      enabled: cookieSettings.marketing,
      canToggle: true,
      icon: <Target className="w-6 h-6" />,
      color: 'pacific_cyan'
    }
  ];

  const handleSaveSettings = () => {
    // Here you would typically save the settings to localStorage or send to backend
    localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings));
    alert(language === 'is' ? 'Stillingar vistaðar!' : 'Settings saved!');
  };

  return (
    <div className="min-h-screen bg-light_cyan pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-federal_blue rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'is' ? 'Vafrakökustillingar' : 'Cookie Settings'}
          </h1>
          <div className="text-lg text-federal_blue font-medium mb-4">
            Verki ehf.
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'is' 
              ? 'Stilltu hvaða vafrakökur þú vilt leyfa. Þú getur breytt þessum stillingum hvenær sem er.'
              : 'Configure which cookies you want to allow. You can change these settings at any time.'
            }
          </p>
        </div>

        {/* Privacy Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-federal_blue" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'is' ? 'Persónuvernd' : 'Privacy'}
            </h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            {language === 'is'
              ? 'Við verðum persónuvernd þína og gefum þér stjórn á því hvaða gögn eru safnað. Veldu hvaða vafrakökur þú vilt leyfa hér að neðan.'
              : 'We value your privacy and give you control over what data is collected. Choose which cookies you want to allow below.'
            }
          </p>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-8 mb-16">
          {cookieCategories.map((category, index) => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-${category.color}-100 rounded-full flex items-center justify-center mr-4`}>
                    <div className={`text-${category.color}`}>
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center mb-2">
                    <span className="mr-3 text-sm font-medium text-gray-700">
                      {language === 'is' ? 'Val þitt:' : 'Your choice:'}
                    </span>
                    <button
                      onClick={() => handleToggle(category.id)}
                      disabled={!category.canToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${category.color} ${
                        category.enabled 
                          ? `bg-${category.color}` 
                          : 'bg-gray-300'
                      } ${!category.canToggle ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          category.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center text-sm">
                    {category.enabled ? (
                      <>
                        <CheckCircle className={`w-4 h-4 text-${category.color} mr-1`} />
                        <span className={`text-${category.color} font-medium`}>
                          {category.canToggle 
                            ? (language === 'is' ? 'Leyft' : 'Allowed')
                            : (language === 'is' ? 'Leyft (Nauðsynlegt - Ekki hægt að slökkva)' : 'Allowed (Required - Cannot be turned off)')
                          }
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="text-gray-500 font-medium">
                          {language === 'is' ? 'Ekki leyft' : 'Not allowed'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* What we do section */}
              <div className={`bg-${category.color}-50 rounded-lg p-6`}>
                <h4 className="font-semibold text-gray-900 mb-3">
                  {language === 'is' ? 'Hvað gerum við' : 'What we do'}
                </h4>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {category.whatWeDo}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-16">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-non_photo_blue-100 rounded-full flex items-center justify-center mr-4">
              <Database className="w-6 h-6 text-non_photo_blue" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {language === 'is' ? 'Gagnastjórnun' : 'Data management'}
            </h3>
          </div>
          
          <p className="text-gray-700 mb-6">
            {language === 'is'
              ? 'Ef þú vilt eyða eða sækja gögnin þín þarftu að skrá þig inn til að staðfesta auðkenni þitt.'
              : 'If you want to delete or download your data, you must log in to verify your identity.'
            }
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'is' ? 'Skrá inn hér' : 'Log in here'}
              </h4>
              <a 
                href="/login" 
                className="inline-flex items-center text-non_photo_blue hover:text-federal_blue font-medium transition-colors duration-200"
              >
                {language === 'is' ? 'Fara í innskráningu' : 'Go to login'}
                <CheckCircle className="w-4 h-4 ml-2" />
              </a>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === 'is' ? 'Persónuverndarstefna' : 'Privacy Policy'}
              </h4>
              <a 
                href="/privacy-policy" 
                className="inline-flex items-center text-pacific_cyan hover:text-federal_blue font-medium transition-colors duration-200"
              >
                {language === 'is' ? 'Lesa persónuverndarstefnu' : 'Read privacy policy'}
                <CheckCircle className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Save Settings Button */}
        <div className="text-center mb-16">
          <button
            onClick={handleSaveSettings}
            className="inline-flex items-center bg-federal_blue text-white font-semibold px-12 py-4 rounded-xl hover:bg-honolulu_blue transition-colors duration-200 shadow-lg"
          >
            <Settings className="w-5 h-5 mr-3" />
            {language === 'is' ? 'Vista stillingar' : 'Save settings'}
          </button>
        </div>

        {/* Important Notice */}
        <div className="bg-federal_blue-50 rounded-xl p-8 border border-federal_blue-200 mb-16">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-federal_blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Info className="w-6 h-6 text-federal_blue" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'is' ? 'Mikilvægt að vita' : 'Important to know'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    {language === 'is'
                      ? 'Þú getur breytt þessum stillingum hvenær sem er með því að koma aftur á þessa síðu'
                      : 'You can change these settings at any time by returning to this page'
                    }
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    {language === 'is'
                      ? 'Nauðsynlegar vafrakökur eru alltaf virkjar til að vefsíðan virki rétt'
                      : 'Required cookies are always active for the website to function properly'
                    }
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-federal_blue mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    {language === 'is'
                      ? 'Stillingarnar þínar eru vistaðar á tækinu þínu og fylgja ekki með ef þú skiptir um tæki'
                      : 'Your settings are stored on your device and do not transfer if you switch devices'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-federal_blue rounded-xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold">
              {language === 'is' ? 'Spurningar um vafrakökur?' : 'Questions about cookies?'}
            </h3>
          </div>
          
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            {language === 'is'
              ? 'Ef þú hefur spurningar um vafrakökur eða persónuvernd, hafðu endilega samband við okkur.'
              : 'If you have questions about cookies or privacy, please feel free to contact us.'
            }
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Mail className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">{language === 'is' ? 'Tölvupóstur' : 'Email'}</p>
              <p className="text-sm opacity-80">verki@verki.is</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Phone className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">{language === 'is' ? 'Sími' : 'Phone'}</p>
              <p className="text-sm opacity-80">787 7887</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:verki@verki.is" 
              className="inline-flex items-center bg-white text-federal_blue font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <Mail className="w-5 h-5 mr-3" />
              {language === 'is' ? 'Senda tölvupóst' : 'Send email'}
            </a>
            <a 
              href="/privacy-policy" 
              className="inline-flex items-center bg-white bg-opacity-20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-opacity-30 transition-colors duration-200 backdrop-blur-sm"
            >
              <Shield className="w-5 h-5 mr-3" />
              {language === 'is' ? 'Persónuverndarstefna' : 'Privacy Policy'}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CookieSettingsPage;