
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    const db = JSON.parse(data);

    if (db.students) {
        db.students = db.students.map(s => {
            // Remove the specific google placeholder or just all images if user wants "clean" slate
            // User said "hala duruyor", implies they want them gone.
            // Let's clear all so they can upload new ones on fresh start.
            // Or better, only clear the long google ones.
            if (s.image && s.image.includes('lh3.googleusercontent.com')) {
                s.image = "";
            }
            return s;
        });
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
        console.log('Cleaned student images.');
    }
} catch (e) {
    console.error('Error cleaning db:', e);
}
