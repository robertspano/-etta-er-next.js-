import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = ({ translations, language }) => {
  const breadcrumbs = [
    { name: language === 'is' ? 'Heim' : 'Hjem', href: '/' },
    { name: language === 'is' ? 'Persónuverndarstefna' : 'Personvernerklæring', href: null }
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
          {language === 'is' ? 'Persónuverndarstefna' : 'Personvernerklæring'}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {language === 'is'
            ? 'Síðast uppfært: 18. ágúst 2025'
            : 'Sist oppdatert: 18. august 2025'
          }
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '1. Inngangur' : '1. Innledning'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Hjá BuildConnect tökum við persónuvernd þína alvarlega. Þessi persónuverndarstefna útskýrir hvernig við söfnum, notum, geymum og verndum persónulegar upplýsingar þínar þegar þú notar vefsíðu okkar og þjónustu.'
                : 'Hos BuildConnect tar vi personvernet ditt på alvor. Denne personvernerklæringen forklarer hvordan vi samler inn, bruker, lagrer og beskytter personopplysningene dine når du bruker nettstedet vårt og tjenestene.'
              }
            </p>
            <p className="text-gray-700">
              {language === 'is'
                ? 'Með því að nota BuildConnect samþykkir þú söfnun og notkun upplýsinga í samræmi við þessa stefnu.'
                : 'Ved å bruke BuildConnect samtykker du til innsamling og bruk av informasjon i samsvar med denne erklæringen.'
              }
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '2. Upplýsingar sem við söfnum' : '2. Informasjon vi samler inn'}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'is' ? 'Persónulegar upplýsingar:' : 'Personopplysninger:'}
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>{language === 'is' ? 'Nafn og samskiptaupplýsingar' : 'Navn og kontaktinformasjon'}</li>
                  <li>{language === 'is' ? 'Netfang og símanúmer' : 'E-postadresse og telefonnummer'}</li>
                  <li>{language === 'is' ? 'Póstfang' : 'Postadresse'}</li>
                  <li>{language === 'is' ? 'Fyrirtækjaupplýsingar (fyrir fagmenn)' : 'Bedriftsinformasjon (for fagfolk)'}</li>
                  <li>{language === 'is' ? 'Greiðsluupplýsingar' : 'Betalingsinformasjon'}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'is' ? 'Notkunarrupplýsingar:' : 'Bruksinformasjon:'}
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>{language === 'is' ? 'IP tölur og vafraupplýsingar' : 'IP-adresser og nettleserinformasjon'}</li>
                  <li>{language === 'is' ? 'Síðuvísanir og notkunarmynstur' : 'Sidevisninger og bruksmønstre'}</li>
                  <li>{language === 'is' ? 'Leitaráðsöknir og val' : 'Søkeforespørsler og preferanser'}</li>
                  <li>{language === 'is' ? 'Tækjaupplýsingar' : 'Enhetsinformasjon'}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '3. Hvernig við notum upplýsingar þínar' : '3. Hvordan vi bruker informasjonen din'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Við notum persónulegar upplýsingar þínar í eftirfarandi tilgangi:'
                : 'Vi bruker personopplysningene dine til følgende formål:'
              }
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>
                {language === 'is'
                  ? 'Að veita og viðhalda þjónustu okkar'
                  : 'Å levere og vedlikeholde tjenestene våre'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Að tengja viðskiptavini við fagmenn'
                  : 'Å koble kunder med fagfolk'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Að senda þér tilkynningar um þjónustuna'
                  : 'Å sende deg varsler om tjenesten'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Að bæta og sérsníða þjónustu okkar'
                  : 'Å forbedre og tilpasse tjenestene våre'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Að framfylgja skilmálum okkar og vernda gegn svikum'
                  : 'Å håndheve våre vilkår og beskytte mot svindel'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Að uppfylla lagalegar skuldbindingar'
                  : 'Å oppfylle juridiske forpliktelser'
                }
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '4. Miðlun upplýsinga' : '4. Deling av informasjon'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Við miðlum persónulegum upplýsingum þínum eingöngu við:'
                : 'Vi deler personopplysningene dine kun med:'
              }
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>
                {language === 'is'
                  ? 'Fagmenn þegar þú biður um tilboð eða tengingar'
                  : 'Fagfolk når du ber om tilbud eller forbindelser'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Þjónustuveitendur okkar sem aðstoða við rekstur vefsvæðisins'
                  : 'Våre tjenesteleverandører som hjelper til med å drive nettstedet'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Lögreglu eða öðrum yfirvöldum þegar lögum krefur'
                  : 'Politiet eller andre myndigheter når det kreves av loven'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Með skýru samþykki þínu í öðrum tilvikum'
                  : 'Med ditt eksplisitte samtykke i andre tilfeller'
                }
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '5. Gagnaöryggi' : '5. Datasikkerhet'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Við tökum öryggið af persónulegum upplýsingum þínum alvarlega og notum viðeigandi tæknilegar og skipulagslegar ráðstafanir til að vernda þær gegn óviðkomandi aðgangi, breytingum, birtingu eða eyðileggingu.'
                : 'Vi tar sikkerheten til personopplysningene dine på alvor og bruker passende tekniske og organisatoriske tiltak for å beskytte dem mot uautorisert tilgang, endring, offentliggjøring eller ødeleggelse.'
              }
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                {language === 'is' ? 'Öryggisráðstafanir okkar innihalda:' : 'Våre sikkerhetstiltak inkluderer:'}
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-blue-800">
                <li>{language === 'is' ? 'SSL dulkóðun fyrir öll gögn í flutningi' : 'SSL-kryptering for alle data i bevegelse'}</li>
                <li>{language === 'is' ? 'Örugg gagnageymsla með reglulegum öryggisafritum' : 'Sikker datalagring med regelmessige sikkerhetskopier'}</li>
                <li>{language === 'is' ? 'Takmarkaður aðgangur að persónulegum gögnum' : 'Begrenset tilgang til personopplysninger'}</li>
                <li>{language === 'is' ? 'Regluleg öryggismat og uppfærslur' : 'Jevnlige sikkerhetsvurderinger og oppdateringer'}</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '6. Kökur (Cookies)' : '6. Informasjonskapsler (Cookies)'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Við notum kökur til að bæta upplifun þína á vefsvæðinu okkar. Kökur eru litlar textaskrár sem eru geymdar í vafranum þínum.'
                : 'Vi bruker informasjonskapsler for å forbedre opplevelsen din på nettstedet vårt. Informasjonskapsler er små tekstfiler som lagres i nettleseren din.'
              }
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'is' ? 'Tegundir kaka sem við notum:' : 'Typer informasjonskapsler vi bruker:'}
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>
                    <strong>{language === 'is' ? 'Nauðsynlegar kökur:' : 'Nødvendige informasjonskapsler:'}</strong>
                    {language === 'is' ? ' Nauðsynlegar fyrir grunnvirkni' : ' Nødvendig for grunnfunksjonalitet'}
                  </li>
                  <li>
                    <strong>{language === 'is' ? 'Frammistöðukökur:' : 'Ytelseskapser:'}</strong>
                    {language === 'is' ? ' Hjálpa okkur að skilja hvernig þú notar vefinn' : ' Hjelper oss å forstå hvordan du bruker nettstedet'}
                  </li>
                  <li>
                    <strong>{language === 'is' ? 'Valkökur:' : 'Preferansekapser:'}</strong>
                    {language === 'is' ? ' Muna val þín og stillingar' : ' Husker valgene og innstillingene dine'}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '7. Réttindi þín' : '7. Dine rettigheter'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Þú hefur eftirfarandi réttindi varðandi persónulegar upplýsingar þínar:'
                : 'Du har følgende rettigheter angående personopplysningene dine:'
              }
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>
                {language === 'is'
                  ? 'Aðgangur: Þú getur beðið um afrit af persónulegum upplýsingum sem við höfum um þig'
                  : 'Tilgang: Du kan be om en kopi av personopplysningene vi har om deg'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Leiðrétting: Þú getur beðið um að rangar upplýsingar verði leiðréttar'
                  : 'Retting: Du kan be om at unøyaktig informasjon blir rettet'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Eyðing: Þú getur beðið um að persónulegum upplýsingum þínum verði eytt'
                  : 'Sletting: Du kan be om at personopplysningene dine blir slettet'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Andmæli: Þú getur andmælt vinnslu á persónulegum upplýsingum þínum'
                  : 'Innsigelse: Du kan protestere mot behandling av personopplysningene dine'
                }
              </li>
              <li>
                {language === 'is'
                  ? 'Flutningur gagna: Þú getur beðið um að fá persónulegar upplýsingar þínar í skipulagðri, algengri og véltækni lesanlegri skrá'
                  : 'Dataportabilitet: Du kan be om å få personopplysningene dine i et strukturert, vanlig brukt og maskinlesbart format'
                }
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '8. Geymsla gagna' : '8. Datalagring'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Við geymum persónulegar upplýsingar þínar aðeins eins lengi og nauðsynlegt er til að uppfylla tilganginn sem þær voru safnaðar fyrir eða eins lengi og lög krefjast.'
                : 'Vi lagrer personopplysningene dine bare så lenge som nødvendig for å oppfylle formålet de ble samlet inn for, eller så lenge som loven krever.'
              }
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '9. Breytingar á þessari stefnu' : '9. Endringer i denne erklæringen'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Við gætum uppfært þessa persónuverndarstefnu af og til. Við munum tilkynna þér um allar mikilvægar breytingar með því að birta nýju stefnuna á þessari síðu og uppfæra "síðast uppfært" dagsetninguna.'
                : 'Vi kan oppdatere denne personvernerklæringen fra tid til annen. Vi vil varsle deg om alle vesentlige endringer ved å publisere den nye erklæringen på denne siden og oppdatere "sist oppdatert"-datoen.'
              }
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'is' ? '10. Samband' : '10. Kontakt'}
            </h2>
            <p className="text-gray-700 mb-4">
              {language === 'is'
                ? 'Ef þú hefur spurningar um þessa persónuverndarstefnu eða vilt nýta réttindi þín, vinsamlegast hafðu samband við okkur:'
                : 'Hvis du har spørsmål om denne personvernerklæringen eller ønsker å utøve rettighetene dine, vennligst kontakt oss:'
              }
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>BuildConnect - {language === 'is' ? 'Persónuverndartíminn' : 'Personvernteam'}</strong>
              </p>
              <p className="text-gray-700 mb-2">
                {language === 'is' ? 'Netfang:' : 'E-post:'} privacy@buildconnect.is
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

export default PrivacyPolicy;