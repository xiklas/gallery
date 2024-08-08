const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

admin.initializeApp();

exports.updateImageList = functions
  .region("europe-west3")
  .storage
  .object()
  .onFinalize(async (object) => {
    // Überprüfe, ob die hochgeladene Datei ein Bild ist
    if (!object.contentType.startsWith("image/")) {
      return null;
    }

    const filePath = object.name;
    const bucket = admin.storage().bucket();

    // Bild-URL erstellen
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/` +
                    `${encodeURIComponent(filePath)}?alt=media`;

    // Lade aktuelle Liste der Bilder
    const imageListPath = path.join(__dirname, "../public/imageList.json");
    let imageList = [];
    try {
      imageList = JSON.parse(fs.readFileSync(imageListPath, "utf8"));
    } catch (error) {
      console.log("Keine vorherige imageList gefunden. Erstelle eine neue.");
    }

    // Füge die neue Bild-URL hinzu
    imageList.push(imageUrl);

    // Speichere die aktualisierte Liste
    fs.writeFileSync(imageListPath, JSON.stringify(imageList, null, 2));

    return null;
  });
