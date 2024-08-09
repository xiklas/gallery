const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const path = require("path");

admin.initializeApp();
const storage = new Storage();

exports.onImageUpload = functions
  .region("europe-west3")
  .storage
  .object()
  .onFinalize(async (object) => {
    // Überprüfe, ob die Datei ein Bild ist
    if (!object.contentType.startsWith("image/")) {
      console.log("Kein Bild hochgeladen.");
      return null;
    }

    const filePath = object.name;
    const bucket = admin.storage().bucket();
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`;

    // Pfad zur imageList.json im Cloud Storage
    const imageListFile = bucket.file("imageList.json");

    let imageList = [];
    try {
      const [fileExists] = await imageListFile.exists();
      if (fileExists) {
        const [contents] = await imageListFile.download();
        imageList = JSON.parse(contents.toString());
      } else {
        console.log("Keine vorherige imageList gefunden. Erstelle eine neue.");
      }
    } catch (error) {
      console.error("Fehler beim Laden der imageList.json:", error);
    }

    // Neue Bild-URL zur Liste hinzufügen
    imageList.push(imageUrl);

    // Aktualisierte Liste zurück in den Cloud Storage schreiben
    await imageListFile.save(JSON.stringify(imageList, null, 2));
    console.log("imageList.json erfolgreich aktualisiert.");

    return null;
  });