require('dotenv').config();
const mongoose = require('mongoose');
const Drug = require('./models/Drug');

mongoose.connect(process.env.MONGO_URI);

const drugs = [
  {
    name: "Acetazolamide",
    form: "Injection",
    strength: "500 mg",
    unit: "Ampoule",
    price: 17.16,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Acetazolamide",
    form: "Tablet",
    strength: "250 mg",
    unit: "Tablet",
    price: 0.88,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Acetylcysteine",
    form: "Injection",
    strength: "200 mg/mL",
    unit: "1 mL",
    price: 62.98,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Acetylsalicylic Acid",
    form: "Tablet",
    strength: "300 mg",
    unit: "Tablet",
    price: 0.55,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Acetylsalicylic Acid",
    form: "Tablet (Dispersible)",
    strength: "75 mg",
    unit: "Tablet",
    price: 0.33,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Actinomycin D",
    form: "Injection",
    strength: "0.5 mg",
    unit: "Vial",
    price: 205.57,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Activated Charcoal",
    form: "Powder",
    strength: "50 g",
    unit: "Pack",
    price: 6.98,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Acyclovir",
    form: "Eye Ointment",
    strength: "3%",
    unit: "2 g",
    price: 52.03,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Acyclovir",
    form: "Injection",
    strength: "250mg",
    unit: "vial",
    price: 136.13,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Acyclovir",
    form: "Suspension",
    strength: "200 mg/5 mL",
    unit: "20 mL",
    price: 276.91,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Acyclovir",
    form: "Tablet",
    strength: "200 mg",
    unit: "Tablet",
    price: 1.98,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Adrenaline",
    form: "Injection",
    strength: "1 mg/1mL (1:1000)",
    unit: "1 mL",
    price: 7.70,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Adrenaline",
    form: "Injection",
    strength: "1:10,000",
    unit: "Vial",
    price: 6.55,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Albendazole",
    form: "Tablet",
    strength: "200 mg",
    unit: "Tablet",
    price: 4.68,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Albendazole",
    form: "Tablet",
    strength: "400 mg",
    unit: "Tablet",
    price: 1.17,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Amoxicillin",
    form: "Dispersible Tablet",
    strength: "250 mg",
    unit: "Tablet",
    price: 1.87,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Amoxicillin",
    form: "Capsule,",
    strength: "250 mg",
    unit: "Capsule",
    price: 0.47,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },{
    name: "Benzoyl Peroxide",
    form: "Cream",
    strength: "10%",
    unit: "30 G",
    price: 131.45,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Betaxolol HCL",
    form: "Eye Drops",
    strength: "0.5%",
    unit: "5 mL",
    price: 19.89,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Calcium Carbonate",
    form: "Tablet",
    strength: "500 mg",
    unit: "Tablet",
    price: 3.30,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Clotrimazole",
    form: "Cream",
    strength: "1%",
    unit: "30 G",
    price: 8.80,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Chloramphenicol",
    form: "Ear Drops",
    strength: "5%",
    unit: "10 mL",
    price: 6.88,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Eliquis",
    form: "Tablet",
    strength: "100mg",
    unit: "Tablet",
    price: 12.40,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Griseofulvin",
    form: "Tablet",
    strength: "500 mg",
    unit: "Tablet",
    price: 2.20,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Paracetamol",
    form: "Tablet",
    strength: "500 mg",
    unit: "Tablet",
    price: 0.12,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Multivitamin",
    form: "Drops",
    strength: "",
    unit: "20 mL",
    price: 24.20,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Multivitamin",
    form: "Tablet",
    strength: "",
    unit: "Tablet",
    price: 0.07,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Xarelto",
    form: "Tablet",
    strength: "240mg",
    unit: "Tablet",
    price: 50.40,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Terbinafine HCl",
    form: "Tablet",
    strength: "250 mg",
    unit: "Tablet",
    price: 3.03,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
  {
    name: "Zinc",
    form: "Tablet",
    strength: "10mg",
    unit: "Tablet",
    price: 0.18,
    pharmacy: "NHIS Approved",
    location: "Ghana"
  },
];

async function seedDB() {
  await Drug.deleteMany({});
  await Drug.insertMany(drugs);
  console.log("Database seeded with Ghanaian drug data.");
  mongoose.connection.close();
}

seedDB();
