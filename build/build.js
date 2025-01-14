var gui = new dat.GUI();
var guiLettre = gui.addFolder('Lettres');
var guiLangue = gui.addFolder('Langues');
var guiCouleur = gui.addFolder('Couleurs');
var guiGrille = gui.addFolder('Grille');
var guiMarkov = gui.addFolder('Caractéristiques des mots inventés');
var params = {
    Download_Image: function () { return save(); },
    Random_Seed: 0,
    Nb_mots: 20,
    Couleur_fond: "#ebe8d4",
    Couleur_mots: "#25231f",
    Mots_inventes: false
};
var paramsGrille = {
    Divisions_Horizontales: 4,
    Divisions_Verticales: 15
};
var paramsMarkov = {
    nbreLettreMax: 10,
    ordre: 3
};
var paramsLangue = {
    Italien: true,
    Français: true,
    Anglais: true,
    Allemand: true
};
var paramsLettre = {
    a: false,
    b: true,
    c: true,
    d: true,
    e: false,
    f: false,
    g: false,
    h: false,
    i: false,
    j: false,
    k: false,
    l: true,
    m: false,
    n: false,
    o: true,
    p: true,
    q: true,
    r: false,
    s: false,
    t: false,
    u: false,
    v: false,
    w: false,
    x: false,
    y: false,
    z: false
};
gui.add(params, "Random_Seed", 0, 100, 1);
gui.add(params, "Nb_mots", 0, 100, 1);
gui.add(params, "Mots_inventes");
guiGrille.add(paramsGrille, "Divisions_Horizontales", 0, 20, 1);
guiGrille.add(paramsGrille, "Divisions_Verticales", 0, 20, 1);
guiMarkov.add(paramsMarkov, "nbreLettreMax", 0, 20, 1);
guiMarkov.add(paramsMarkov, "ordre", 0, 10, 1);
guiCouleur.addColor(params, "Couleur_mots");
guiCouleur.addColor(params, "Couleur_fond");
guiLettre.add(paramsLettre, "a");
guiLettre.add(paramsLettre, "b");
guiLettre.add(paramsLettre, "c");
guiLettre.add(paramsLettre, "d");
guiLettre.add(paramsLettre, "e");
guiLettre.add(paramsLettre, "f");
guiLettre.add(paramsLettre, "g");
guiLettre.add(paramsLettre, "h");
guiLettre.add(paramsLettre, "i");
guiLettre.add(paramsLettre, "j");
guiLettre.add(paramsLettre, "k");
guiLettre.add(paramsLettre, "l");
guiLettre.add(paramsLettre, "m");
guiLettre.add(paramsLettre, "n");
guiLettre.add(paramsLettre, "o");
guiLettre.add(paramsLettre, "p");
guiLettre.add(paramsLettre, "q");
guiLettre.add(paramsLettre, "r");
guiLettre.add(paramsLettre, "s");
guiLettre.add(paramsLettre, "t");
guiLettre.add(paramsLettre, "u");
guiLettre.add(paramsLettre, "v");
guiLettre.add(paramsLettre, "w");
guiLettre.add(paramsLettre, "x");
guiLettre.add(paramsLettre, "y");
guiLettre.add(paramsLettre, "z");
guiLangue.add(paramsLangue, "Italien");
guiLangue.add(paramsLangue, "Français");
guiLangue.add(paramsLangue, "Anglais");
guiLangue.add(paramsLangue, "Allemand");
gui.add(params, "Download_Image");
function draw() {
    var liste_mots = [];
    var liste_lettres = [];
    var n = params.Nb_mots;
    var x = 0;
    var y = 0;
    var tableau_x = [];
    var tableau_y = [];
    var size = [18, 36, 72];
    var ordre = paramsMarkov.ordre;
    var nbreLettreMax = paramsMarkov.nbreLettreMax;
    var chaineMots = "";
    var objNgramme = {};
    var debut = [];
    for (var i = 0; i < paramsGrille.Divisions_Horizontales; i++) {
        tableau_x[i] = i;
    }
    for (var i = 0; i < paramsGrille.Divisions_Verticales; i++) {
        tableau_y[i] = i;
    }
    for (var element in paramsLettre) {
        if (paramsLettre[element] == true) {
            liste_lettres.push(element);
        }
    }
    var allWords = [];
    if (paramsLangue.Anglais == true) {
        allWords = allWords.concat(result_en);
    }
    if (paramsLangue.Français == true) {
        allWords = allWords.concat(result_fr);
    }
    if (paramsLangue.Italien == true) {
        allWords = allWords.concat(result_it);
    }
    if (paramsLangue.Allemand == true) {
        allWords = allWords.concat(result_de);
    }
    liste_mots = allWords.filter(function (mot) { return !mot.split("").some(function (char) { return !liste_lettres.includes(char); }); });
    if (params.Mots_inventes == true) {
        chainesMarkov(ordre, chaineMots, objNgramme, debut, liste_mots);
    }
    background(params.Couleur_fond);
    randomSeed(params.Random_Seed);
    for (var i = 0; i < n; i++) {
        fill(params.Couleur_mots);
        textFont(myFont);
        textAlign(CENTER, CENTER);
        textSize(random(size));
        x = random(tableau_x) * (width / paramsGrille.Divisions_Horizontales);
        y = random(tableau_y) * (height / paramsGrille.Divisions_Verticales);
        if (params.Mots_inventes == false) {
            text(random(liste_mots), x, y, width / paramsGrille.Divisions_Horizontales, height / paramsGrille.Divisions_Verticales);
        }
        if (params.Mots_inventes == true) {
            var mot = createWord(debut, objNgramme, ordre, nbreLettreMax);
            text(mot, x, y, width / paramsGrille.Divisions_Horizontales, height / paramsGrille.Divisions_Verticales);
        }
    }
}
var result_fr;
var result_en;
var result_it;
var result_de;
var myFont;
function preload() {
    result_fr = loadStrings('assets/liste_fr.txt');
    result_en = loadStrings('assets/liste_en.txt');
    result_it = loadStrings('assets/liste_it.txt');
    result_de = loadStrings('assets/liste_de.txt');
    myFont = loadFont('assets/Helvetica.ttf');
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
function chainesMarkov(ordre, chaineMots, objNgramme, debut, liste_mots) {
    for (var i = 0; i < liste_mots.length; i++) {
        var lettres = liste_mots[i].substring(0, ordre);
        if (lettres.length == ordre) {
            debut.push(lettres);
        }
    }
    for (var i = 0; i < liste_mots.length; i++) {
        chaineMots = chaineMots + liste_mots[i] + " ";
    }
    for (var i = 0; i < chaineMots.length; i++) {
        var ngramme = chaineMots.substring(i, i + ordre);
        if (!objNgramme[ngramme]) {
            objNgramme[ngramme] = [];
            objNgramme[ngramme].push(chaineMots.charAt(i + ordre));
        }
        else {
            objNgramme[ngramme].push(chaineMots.charAt(i + ordre));
        }
    }
}
function createWord(debut, objNgramme, ordre, nbreLettreMax) {
    var ngrammCourant = random(debut);
    var resultat = ngrammCourant;
    for (var i = 0; i < nbreLettreMax; i++) {
        var possible = objNgramme[ngrammCourant];
        var prochain = random(possible);
        if (prochain == " ") {
            break;
        }
        resultat = resultat + prochain;
        ngrammCourant = resultat.substring(resultat.length - ordre, resultat.length);
    }
    return resultat;
}
var __ASPECT_RATIO = 134 / 99;
var __MARGIN_SIZE = 50;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map