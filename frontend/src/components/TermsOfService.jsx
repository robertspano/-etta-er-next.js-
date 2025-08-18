import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = ({ translations, language }) => {
  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Hjem', href: '/' },
    { name: language === 'is' ? 'Þjónustuskilmálar' : 'Terms of Service', href: null }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {crumb.href ? (
                  <Link to={crumb.href} className="text-blue-600 hover:text-blue-800">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-gray-500">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'is' ? 'Þjónustuskilmálar' : 'Terms of Service'}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {language === 'is'
            ? 'Síðast uppfært: 18. ágúst 2025'
            : 'Last updated: August 18, 2025'
          }
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '1. Almennir skilmálar' : '1. Generelle vilkår'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Velkomin á BuildConnect. Þessir þjónustuskilmálar gilda um notkun þína á vefsíðunni okkar og þjónustu. Með því að nota BuildConnect samþykkir þú þessa skilmála að fullu.'
                : 'Velkommen til BuildConnect. Disse vilkårene for bruk gjelder for din bruk av nettstedet vårt og tjenestene. Ved å bruke BuildConnect samtykker du fullt ut til disse vilkårene.'
              }
            </p>
            <p className="text-gray-700">
              {language === 'is'
                ? 'BuildConnect er markaðstorg sem tengir saman viðskiptavini sem þurfa þjónustu við faglærða verktaka og þjónustuveita á Íslandi.'
                : 'BuildConnect er en markedsplass som forbinder kunder som trenger tjenester med faglige entreprenører og tjenesteleverandører i Island.'
              }
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '2. Notendareikningar' : '2. Brukerkontoer'}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                {language === 'is'
                  ? 'Til að nota suma eiginleika BuildConnect þarftu að búa til notendareikning. Þú ert ábyrgur fyrir:'
                  : 'For å bruke enkelte funksjoner på BuildConnect må du opprette en brukerkonto. Du er ansvarlig for:'
                }
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {language === 'is'
                    ? 'Að halda reikningsupplýsingum þínum öruggum og trúnaðarmálum'
                    : 'Å holde kontoinformasjonen din sikker og konfidensiell'
                  }
                </li>
                <li>
                  {language === 'is'
                    ? 'Alla starfsemi sem á sér stað undir reikningi þínum'
                    : 'All aktivitet som skjer under kontoen din'
                  }
                </li>
                <li>
                  {language === 'is'
                    ? 'Að láta okkur vita tafarlaust ef þú grunar óviðkomandi notkun á reikningi þínum'
                    : 'Å informere oss umiddelbart hvis du mistenker uautorisert bruk av kontoen din'
                  }
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '3. Þjónustukaup og greiðslur' : '3. Tjenestekjøp og betalinger'}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                {language === 'is'
                  ? 'BuildConnect auðveldar tengingar milli viðskiptavina og fagmanna. Allir samningar um þjónustu og greiðslur eru beint á milli þín og fagmannsins.'
                  : 'BuildConnect forenkler forbindelser mellom kunder og fagfolk. Alle serviceavtaler og betalinger er direkte mellom deg og fagpersonen.'
                }
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                {language === 'is' ? 'Greiðsluskilmálar:' : 'Betalingsbetingelser:'}
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {language === 'is'
                    ? 'Öll greiðsla fer fram beint á milli viðskiptavins og fagmanns'
                    : 'All betaling skjer direkte mellom kunde og fagperson'
                  }
                </li>
                <li>
                  {language === 'is'
                    ? 'BuildConnect tekur enga þóknun fyrir greiðslur'
                    : 'BuildConnect tar ingen provisjon for betalinger'
                  }
                </li>
                <li>
                  {language === 'is'
                    ? 'Greiðslumáti og skilmálar eru samkomulag milli viðskiptavins og fagmanns'
                    : 'Betalingsmåte og betingelser er en avtale mellom kunde og fagperson'
                  }
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '4. Notendahegðun og takmörkun' : '4. Brukeratferd og begrensninger'}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                {language === 'is'
                  ? 'Þegar þú notar BuildConnect samþykkir þú að fara ekki eftir eftirfarandi:'
                  : 'Når du bruker BuildConnect samtykker du til ikke å gjøre følgende:'
                }
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {language === 'is'
                    ? 'Nota þjónustuna til ólöglegra eða óviðeigandi tilganga'
                    : 'Bruke tjenesten til ulovlige eller upassende formål'
                  }
                </li>
                <li>
                  {language === 'is'
                    ? 'Birta rangar eða villandi upplýsingar'
                    : 'Publisere falsk eller villedende informasjon'
                  }
                </li>
                <li>
                  {language === 'is'
                    ? 'Áreita, ógnana eða misnotkun annarra notenda'
                    : 'Trakassere, true eller misbruke andre brukere'
                  }
                </li>
                <li>
                  {language === 'is'
                    ? 'Trufla eða skaða virkni vefsíðunnar'
                    : 'Forstyrre eller skade funksjonaliteten til nettstedet'
                  }
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '5. Hugverkaréttur' : '5. Immaterielle rettigheter'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Allt efni á BuildConnect, þar á meðal texti, myndir, lógó og hugbúnaður, er eign BuildConnect eða leyfishafa okkar og er verndað af höfundarrétti og öðrum hugverkaréttindum.'
                : 'Alt innhold på BuildConnect, inkludert tekst, bilder, logoer og programvare, eies av BuildConnect eller våre lisensholdere og er beskyttet av opphavsrett og andre immaterielle rettigheter.'
              }
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '6. Persónuvernd' : '6. Personvern'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Persónuvernd þín er mikilvæg fyrir okkur. Vinsamlegast farðu yfir '
                : 'Personvernet ditt er viktig for oss. Vennligst gjennomgå vår '
              }
              <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                {language === 'is' ? 'persónuverndarstefnu okkar' : 'personvernerklæring'}
              </Link>
              {language === 'is'
                ? ' til að skilja hvernig við söfnum, notum og verndum upplýsingar þínar.'
                : ' for å forstå hvordan vi samler inn, bruker og beskytter informasjonen din.'
              }
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '7. Ábyrgðartakmörkun' : '7. Ansvarsbegrensning'}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                {language === 'is'
                  ? 'BuildConnect virkar sem milliliður á milli viðskiptavina og fagmanna. Við berum ekki ábyrgð á:'
                  : 'BuildConnect fungerer som et mellomledd mellom kunder og fagfolk. Vi er ikke ansvarlige for:'
                }
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  {language === 'is'
                    ? 'Gæði eða fullnægjandi vinna sem fagmenn veita'
                    : 'Kvaliteten eller tilfredsstillelsen av arbeidet som fagfolk leverer'
                  }
                </li>
                <li>
                  {language === 'is'
                    ? 'Tvístur eða vandamál sem koma upp á milli viðskiptavina og fagmanna'
                    : 'Tvister eller problemer som oppstår mellom kunder og fagfolk'
                  }
                </li>
                <li>
                  {language === 'is'
                    ? 'Tjón eða tjón sem hlýst af notkun þjónustu fagmanna'
                    : 'Skader eller tap som følge av bruk av fagfolks tjenester'
                  }
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '8. Breytingar á skilmálum' : '8. Endringer i vilkårene'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Við áskildum okkur rétt til að breyta þessum skilmálum hvenær sem er. Breytingar taka gildi strax eftir birtingu á vefsíðunni. Áframhaldandi notkun þjónustunnar eftir breytingar þýðir að þú samþykkir nýju skilmálana.'
                : 'Vi forbeholder oss retten til å endre disse vilkårene når som helst. Endringer trer i kraft umiddelbart etter publisering på nettstedet. Fortsatt bruk av tjenesten etter endringer betyr at du aksepterer de nye vilkårene.'
              }
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '9. Samband' : '9. Kontakt'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Ef þú hefur spurningar um þessa þjónustuskilmála, vinsamlegast hafðu samband við okkur:'
                : 'Hvis du har spørsmål om disse vilkårene for bruk, vennligst kontakt oss:'
              }
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>BuildConnect</strong>
              </p>
              <p className="text-gray-700 mb-2">
                {language === 'is' ? 'Netfang:' : 'E-post:'} support@buildconnect.is
              </p>
              <p className="text-gray-700 mb-2">
                {language === 'is' ? 'Símanúmer:' : 'Telefon:'} +354 123 4567
              </p>
              <p className="text-gray-700">
                {language === 'is' ? 'Heimilisfang:' : 'Adresse:'} Reykjavík, Ísland
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;