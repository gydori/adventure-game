
let readline = require('readline-sync');

let life = 10;

const passziv = () => {
  console.log('Az ellenfeled nyert, minden kívánságát teljesíted. Mivel ez nagyon fárasztó, veszítesz 5 életpontot.');
  life = life - 5;
};

const agressziv = () => {
  console.log('Rátámadtál az ellenfeledre, pedig nem is érdemelte meg. Emiatt rosszul érzad magad, veszítesz 5 életpontot.');
  life = life - 5;
  console.log('Ettől függetlenül legyőzted ellenfeledet, folytathatod utadat.');
};

const asszertiv = () => {
  console.log('Gratulálok! Sikerült megoldani a konfliktust! Nyugodtan folytathatod utadat.');
};

const megembereledMagad = () => {
  console.log('Ötlet híján a valóságról kezdesz írni. Ahogy egyre jobban belemélyedsz úgy jönnek az ötletek.');
  console.log('Nyertél!');
  process.exit();
};

const ajto = () => {
  console.log('Megpróbálod kinyitni az ajtót, de csak pinkóddal nyílik. A pinkód 4 db különböző egyjegyű szám. Hetet tippelhetsz és ha szerepel benne a pinkód számjegyei, kijutottál.');
  let tipp = [];
  for (let i = 0; i < 7; i++) {
    tipp.push(Number(readline.keyIn()));
  }
  let kod = [2, 0, 9, 6];
  let count = 0;
  for (let i = 0; i < tipp.length; i++) {
    for (let j = 0; j < kod.length; j++) {
      if (tipp[i] === kod[j]) {
        count++;
      }
    }
  }
  if (count >= 4) {
    console.log('A pinkód: 2, 0, 9, 6 \n Gratulálok, kijutottál!');
  } else {
    console.log('Nem jutottál ki.');
  }
};

const akasztofa = () => {
  let akaszto = require('./akaszto');
};

while (true) {
  console.log('Üdvözöllek a játékban! \n Kilépéshez nyomd meg a \'q\' gombot!');
  let name = readline.question('Mi legyen a karaktered neve?');
  console.log('Hello', name, '!', '\n', life, 'életed van, használd okosan!');
  console.log('Órán ülsz és kalandjátékot kell írnod.');
  const game = () => {
    console.log('Másfél óra megy el azzal, hogy semmilyen ötleted sem támad és egyre inkább azon jár a fejed, mennyi mindent csinálhatnál helyette. \n Hogyan reagálsz a helyzetre?');
    console.log('  [1] - Felállsz és hazamész\n  [2] - Megembereled magad és írsz valamit');
    let key01 = readline.keyIn();
    if (key01 === '1') {
      console.log('Összepakolsz és elindulsz, mindenki téged néz. Máté megkérdezi mit csinálsz?');
      console.log('   [1] - Elnézést kérsz és visszaülsz.\n  [2] - Megmondod neki, hogy te most hazamész. \n [3] - elrohansz szó nélkül.');
      let key02 = readline.keyIn();
      if (key02 === '1') {
        game();
      } else {
        if (key02 === '2') {
          console.log('Máté ezt nem fogadja el, ezért párbajba kezdtek. Milyen módon szállsz vele harcba?');
          console.log('[1] - passzívan \n [2] - agresszívan \n [3] - asszertívan');
          let key03 = readline.keyIn();
          if (key03 === '1') {
            passziv();
            game();
          } else {
            if (key03 === '2') {
              agressziv();
              ajto();
            } else {
              if (key03 === '3') {
                asszertiv();
                ajto();
              }
            }
          }
        } else {
          if (key02 === '3') {
            console.log('Siettedben nekirohansz az ajtónak, ami zárva van, veszítesz 1 életpontot.');
            life = life - 1;
            ajto();
          } else {
            console.log('Ilyen lehetőséged nincs!');
            process.exit();
          }
        }
      }
    } else {
      if (key01 === '2') {
        megembereledMagad();
      } else {
        console.log('Ilyen lehetőséged nincs!');
        process.exit();
      }
    }
    console.log('Kimész az épületből, elindulsz haza. Elkezd esni az eső. Csak akkor éled túl az égszakadást, ha legalább 7 életpontod van vagy ha szerzel esernyőt.');
    if (life < 7) {
      console.log('Nincs elég életpontod, ha túl akarod élni az esőt harcolj meg az esernyőért!');
    } else {
      console.log('Gratulálok, túlélted az esőt, viszont teljesen eláztál, veszítesz 2 életpontot.');
      life = life - 2;
      console.log(life);
    }
  };
  game();
  let key = readline.keyIn();
  if (key === 'q') {
    break;
  }
}
