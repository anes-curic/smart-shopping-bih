SMART SHOPPING BIH

Članovi tima:
Anes Ćurić
Faris Šolbić
Hasan Mešinović

1.	Opis teme

Smart Shopping BiH je web aplikacija čiji je cilj olakšati građanima poređenje cijena proizvoda u različitim trgovinama i omogućiti im da lakše pronađu najpovoljnije ponude na jednom mjestu.
Aplikacija je trenutno aktivna za područje Zenice, ali se planira proširenje na druge gradove u Bosni i Hercegovini.
Cilj projekta je unaprijediti proces kupovine kroz jednostavno, transparentno i efikasno rješenje koje štedi vrijeme i novac, kako krajnjim korisnicima tako i samim trgovinama.
Projekat je nastao u okviru Univerziteta u Zenici i iza njega stoji tim studenata softverskog inženjerstva, koji žele kroz praktičan rad doprinositi zajednici i razvijati korisna digitalna rješenja.
 
2.	Tehnologije korištene u radu

Tokom izrade projektnog zadatka korišten je veći broj neophodnih tehnologija koje omogućavaju brz, responzivan i pregledan rad aplikacije. Glavni fokus bio je na jednostavnosti implementacije.


Korištene tehnologije za izradu :

a)	Frontend: Za izradu korisničkog sučelja korišten je React.js. React.js predstavlja popularnu JavaScript biblioteku koja omogućava dinamičko 
prikazivanje podataka i organizaciju.
b)	Backend: Za simuliranje serverskog dijela korišten je JSON server, alat koji omogućava kreiranje REST API-ja na osnovu lokalnog .json fajla.
c)	Baza podataka: Kao privremena baza je korišten db.json fajl, koji sadrži struktuirane podatke o kategorijama i proizvodima.
Podaci se čuvaju u json formatu, što omogućava jednostavnu manipulaciju i čitljivost
d)	Navigacija: Za navigiranje po stranici koristi se React Router
e)	Dodatno: HTML5 + CSS, Font Awesome(ikonice), 

Razvojna okruženja i alati: 
* HTML5 + CSS3
* Font Awesome (ikonice)
* Mock backend (db.json za testiranje lokalno)

Visual Studio Code: Glavni editor korišten za pisanje koda
Google Chrome (Developer Tools) : Testiranje  izgleda i funkcionalnosti aplikacije u različitim rezolucijama
Node Package Manager(npm): za instalaciju svih potrebnih biblioteka i paketa potrebnih za pokretanje aplikacije 
 
3.	Opis strukture projekta (mapa/fajlova)
Projekat Smart Shopping BiH razvijan je korištenjem React biblioteke, a organizovan je na način koji omogućava lakšu održivost, preglednost i proširivost. U nastavku se nalazi kratak pregled strukture direktorijuma i najvažnijih fajlova:
smart-shopping-bih/
|
public/
assets/               # slike i logotipi
index.html           # glavni HTML fajl
favicon.ico, manifest.json, robots.txt
|
src/
assets/             # dodatni resursi
components/         # Navbar, Footer, ConfirmModal, ProtectedRoute
context/            # AuthContext, CartContext
data/db.json        # testna baza
pages/              # sve stranice: Home, Cart, AdminPanel, itd.
App.js               # glavna komponenta
styles.css           # globalni stilovi
index.js, index.css
|
package.json, README.md




4.	Funkcionalnosti i opis dizajna

Aplikacija Smart Shopping BiH razvijena je sa ciljem da korisnicima pruži jednostavan način za pregled i usporedbu cijena proizvoda iz različitih kategorija i trgovina.
Glavne funkcionalnosti aplikacije uključuju
o	Responzivan dizajn
o	Mogućnost pretraživanja proizvoda koji vas zanimaju
o	Jednostavna navigacija između kategorija i proizvoda kroz jasno označene menije i kartice
o	Mogućnost pregleda proizvoda uz dodatne opise i cijene
o	Mogućnost dodavanja proizvoda u korpu
o	Automatsko poređenje cijena dodatih prozivoda i ispis najjeftinije cijene za određeni proizvod
o	Mogućnost prijave na stranicu / kreiranje naloga
o	Mogućnost kontaktiranja supporta stranice preko direktne poruke na stranici
Dizajn aplikacije
temelji se na modernom minimalističkom pristupu s jasnim linijama i jednostavnom tipografijom, čime se postiže preglednost i ugodan vizualni dojam. Poseban naglasak stavljen je na korisničko iskustvo (UX) kako bi se smanjila složenost i olakšala navigacija. Prilikom izrade dizajna cilj je bio zadržati što veću jednostavnost kako novi korisnici ne bi imali probleme sa razumjevanje funkcionalnosti stranice.
Paleta boja 
Prilikom izbora boja za izradu projekta cilj je bio zadržati ozbiljnost i minimalizam zbog lakseg pregleda sadržaja za različite kategorije korisnika 
Osnovna boja stranice :  Bijela - #ffffff  i siva (#383838)
Tekst, gumb, opcije: Crna(#000000) i siva (#383838)
Detalji : Plava (#007bff)
Fontovi:

Naslovi: Poppins
Tekst: Roboto


5.	Uloge korisnika aplikacije

Prilikom izrade projekta kreirane su četri osnovne uloge : Guest(Gost); Registrovani korisnik; Admin i zasebni admin profili za svaku radnju npr. Admin.bingo.
1.	Gost
•	Može pregledavati proizvode i kategorije bez potrebe za registracijom
•	Ima ograničen pristup funkcijama aplikacije, bez mogućnosti dodavanja ili uređivanja podataka
•	Cilj ove uloge je omogućiti brz i jednostavan uvid u ponudu proizvoda za sve zainteresovane korisnike
2.	Registrovani korisnik
•	Ima pristup svim funkcionalnostima za pregled proizvoda
•	Prijava i registracija omogućuju personalizovaniji pristup i bolje korisničko iskustvo
•	Može kreirati liste, porediti cijene i dodavati proizvode u korpu

3.	Administrator
•	Ima punu kontrolu nad sadržajem aplikacije
•	Može dodavati, uređivati ili brisati proizvode i kategorije u bazi podataka
•	Upravljanje korisničkim nalozima i praćenje aktivnosti
•	Odgovoran za održavanje tačnosti podataka i tehničku ispravnost aplikacije

4.	Administrator firme
•	Može dodavati proizvode, korigovati cijene i opis samo za prodavnicu/market čiji je admin


 
6. Kratki opis doprinosa svakog člana tima

Anes Ćurić (Frontend):
 Izrada korisničkog sučelja koristeći React, implementirao postojeći dizajn stranica i osigurao responzivnost za različite uređaje. Kreiranje funkcionalnosti stranice. Vršio početno i osnovno testiranje,popravka bugova.

Hasan Mešinović (backend):
Kreirao i održavao JSON Server bazu podataka, radio na povezivanju podataka s frontend aplikacijom i osigurao pravilno funkcionisanje API poziva.

Faris Šolbić (UI/UX dizajn i dokumentacija):
Kreiranje vizuelnog identiteta stranice, uključujući paletu boja, fontove i raspored elemenata kako bi stranica bila jednostavna i ugodna za korištenje. Dodavanje proizvoda u bazu podataka, testiranje te kreiranje dokumentacije.


 
7.	Upute za pokretanje projekta

Za pokretanje aplikacije Smart Shopping BiH potrebno je slijediti sljedeće korake.
      1.	Preuzimanje projekta
         Preuzmite kompletan projekat sa GitHub repozitorija ili dobijte pristup lokalnoj kopiji projekta
   
      2.	Instalacija potrebnih paketa
         Otvorite terminal (Command Prompt, PowerShell ili drugi) u glavnom folderu projekta i pokrenite
   
      3.	Pokretanje JSON Servera (simulirana baza podataka)
         U terminalu pokrenite JSON Server kako biste omogućili pristup podacima.
         json-server --watch src/data/db.json --port 5000
   
       4.	Pokretanje React aplikacije
          U drugom terminalu (dok je JSON Server pokrenut) pokrenite React aplikaciju
          npm start


8.	Snimci ekrana radne aplikacije
   
U nastavku je prikazan snimcak ekrana koji prikazuju ključne dijelove aplikacije Smart Shopping BiH i njene osnovne funkcionalnosti:

[VIDEO](video.mp4)
