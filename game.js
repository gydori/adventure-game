
let readline = require('readline-sync');

let life = 10;

const passziv = () => {
  console.log('Az ellenfeled nyert, minden kívánságát teljesíted. Mivel ez nagyon fárasztó, veszítesz 5 életpontot.\n');
  life = life - 5;
  lifeCheck();
};

const agressziv = () => {
  console.log('Rátámadtál az ellenfeledre, pedig nem is érdemelte meg. Emiatt rosszul érzad magad, veszítesz 5 életpontot.');
  life = life - 5;
  lifeCheck();
  console.log('Ettől függetlenül legyőzted ellenfeledet, folytathatod utadat.\n');
};

const asszertiv = () => {
  console.log('Gratulálok! Sikerült megoldani a konfliktust! Nyugodtan folytathatod utadat.\n');
};

const megembereledMagad = () => {
  console.log('Ötlet híján a valóságról kezdesz írni. Ahogy egyre jobban belemélyedsz úgy jönnek az ötletek.');
  console.log('Nyertél!');
  process.exit();
};

const lifeCheck = () => {
  if (life <= 0) {
    console.log('Elfogyott az életed! Meghaltál!');
    process.exit();
  }
};

const tipp = () => {
  let tipp = [];
  for (let i = 0; i < 6; i++) {
    tipp.push(Number(readline.keyIn()));
  }
  let kod = [2, 0, 9, 6];
  let count = 0;
  for (let i = 0; i < tipp.length; i++) {
    for (let j = 0; j < kod.length; j++) {
      if (tipp[i] === kod[j]) {
        count++;
        kod.splice(j, 1);
      }
    }
  }
  return count;
};

const ajto = () => {
  console.log('Megpróbálod kinyitni az ajtót, de csak pinkóddal nyílik. A pinkód 4 db különböző egyjegyű szám. Hat számot tippelhetsz és ha szerepelnek köztük a pinkód számjegyei, kijutottál.\n');
  if (tipp() >= 4) {
    console.log('A pinkód: 2, 0, 9, 6 \nGratulálok, kijutottál!\n');
  } else {
    console.log('Nem jutottál ki. Veszítettél 2 életpontot.\n');
    life = life - 2;
    lifeCheck();
    console.log('Még kétszer megpróbálhatod.\n');
    if (tipp() >= 4) {
      console.log('A pinkód: 2, 0, 9, 6 \nGratulálok, kijutottál!\n');
    } else {
      console.log('Nem jutottál ki. Veszítettél 2 életpontot.\n');
      life = life - 2;
      lifeCheck();
      console.log('Még egyszer megpróbálhatod.\n');
      if (tipp() >= 4) {
        console.log('A pinkód: 2, 0, 9, 6 \nGratulálok, kijutottál!\n');
      } else {
        console.log('Meghaltál!');
        process.exit();
      }
    }
  }
};

const badInput = () => {
  console.log('Ilyen lehetőséged nincs!');
  process.exit();
};

let result;
const akasztofa = () => {
  let akasztofa = require('./akasztofa');
  result = akasztofa.main();
};

const elaztal = () => {
  console.log('Túlélted az esőt, viszont teljesen eláztál, veszítesz 2 életpontot.');
  life = life - 2;
  lifeCheck();
};

let esernyo = 0;

const game = () => {
  console.log('Másfél óra megy el azzal, hogy semmilyen ötleted sem támad és egyre inkább azon jár a fejed, mennyi mindent csinálhatnál helyette. \n\nHogyan reagálsz a helyzetre?\n');
  console.log('  [1] - Felállsz és hazamész.\n  [2] - Megembereled magad és írsz valamit.');
  let key01 = readline.keyIn();
  switch (key01) {
    case '1':
      console.log('Összepakolsz és elindulsz, mindenki téged néz. Máté megkérdezi mit csinálsz?\n');
      console.log('  [1] - Elnézést kérsz és visszaülsz.\n  [2] - Megmondod neki, hogy te most hazamész. \n  [3] - Elrohansz szó nélkül.');
      let key02 = readline.keyIn();
      switch (key02) {
        case '1':
          game();
          break;
        case '2':
          console.log('Máté ezt nem fogadja el, ezért párbajba kezdtek. Milyen módon szállsz vele harcba?\n');
          console.log('  [1] - Passzívan \n  [2] - Agresszívan \n  [3] - Asszertívan');
          let key03 = readline.keyIn();
          switch (key03) {
            case '1':
              passziv();
              game();
              break;
            case '2':
              agressziv();
              ajto();
              break;
            case '3':
              asszertiv();
              ajto();
              break;
            default:
              badInput();
          }
          break;
        case '3':
          console.log('Siettedben nekirohansz az ajtónak, ami zárva van, veszítesz 1 életpontot.\n');
          life = life - 1;
          lifeCheck();
          ajto();
          break;
        default:
          badInput();
      }
      break;
    case '2':
      megembereledMagad();
      break;
    default:
      badInput();
  }
  console.log('Kimész az épületből, elindulsz haza. Elkezd esni az eső. Csak akkor éled túl az égszakadást, ha legalább 7 életpontod van vagy ha szerzel esernyőt.\n');
  console.log('Életeid:', life, '\n');
  if (life < 7) {
    console.log('Nincs elég életpontod, ha túl akarod élni az esőt harcolj meg az esernyőért!\n');
    akasztofa();
    if (result === 'Nyertél') {
      console.log('Megszerezted az esernyőt.');
      console.log('Gratulálok, túlélted az esőt sértetlenül!\n');
      esernyo = 1;
    } else {
      console.log('Ez most nem sikerült.');
      console.log('Meghaltál!');
      process.exit();
    }
  } else {
    console.log('Van elég életpontod, így túl fogod élni az esőt. Ha szeretnél, harcolhatsz egy esernyőért, hogy ne ázz meg.\n');
    console.log('  [1] - Harcolok az esernyőért!\n  [2] - Megyek tovább esernyő nélkül.');
    let key04 = readline.keyIn();
    switch (key04) {
      case '1':
        akasztofa();
        if (result === 'Nyertél') {
          console.log('Megszerezted az esernyőt.');
          console.log('Gratulálok, túlélted az esőt sértetlenül!\n');
          esernyo = 1;
        } else {
          console.log('Most nem sikerült megszerezni az esernyőt.\n');
          elaztal();
        }
        break;
      case '2':
        elaztal();
        break;
      default:
        badInput();
    }
  }
  console.log('Hazafelé menet újra elkap az eső, de most nem tudsz menekülni előle. Csak akkor éled túl, ha van esernyőd.\n');
  if (esernyo !== 1) {
    console.log('Nincs esernyőd!\nMeghaltál!');
    process.exit();
  } else {
    console.log('Van esernyőd, túlélted az esőt!\n');
  }
  console.log('Épségben hazaértél', life, 'életpontod maradt! Mit csinálsz?\n');
  console.log('  [1] - Lefekszem aludni.\n  [2] - Nekiállok a feladatnak.');
  let key05 = readline.keyIn();
  switch (key05) {
    case '1':
      console.log('Reggelig alszol, így nem tudtad megcsinálni a játékot. Meghaltál!');
      process.exit();
    case '2':
      console.log('Leülsz az asztalodhoz és elkezdesz gondolkozni.\n');
      megembereledMagad();
      break;
    default:
      badInput();
  }
};

while (true) {
  console.log('Üdvözöllek a játékban! \n');
  let name = readline.question('Mi legyen a karaktered neve?  \n');
  console.log('\nHello', name, '!\n\n' + life, 'életed van, használd okosan!\n');
  console.log('Órán ülsz és kalandjátékot kell írnod.');
  game();
  let key = readline.keyIn();
  if (key === 'q') {
    break;
  }
}
