import { Analytics, track } from "@vercel/analytics/react";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useMemo, useState, useEffect, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import FlavorWheelPDFDocument from "./FlavorWheelPDFDocument";

function App() {
  const trackFlavor = (selectedFlavor, level, wheel, topName = "", midName = "", leafName = "") => {
  const fineFlavor = leafName || midName || topName;

  // Vercel Analytics
  track("select_flavor", {
    flavor: fineFlavor,
    level: level,
    wheel: wheel,
    top: topName,
    mid: midName,
    leaf: leafName,
  });

  // Google Analytics
  if (window.gtag) {
    window.gtag("event", "select_flavor", {
      flavor: fineFlavor,
      level: level,
      wheel: wheel,
      top: topName,
      mid: midName,
      leaf: leafName,
    });
  }
};
    function trackWheelSelection({ wheel: wheelType, level, action, topName = "", midName = "", leafName = "" }) {
  console.log("trackWheelSelection fired", { wheel: wheelType, level, action, topName, midName, leafName });

  track("wheel_select", {
    wheel: wheelType,
    level,
    action,
    top: topName,
    mid: midName,
    leaf: leafName,
    value: leafName || midName || topName,
  });

  const selectedFlavor = leafName || (level === "mid" ? midName : "");

  if (selectedFlavor) {
    trackFlavor(selectedFlavor, level, wheelType, topName, midName, leafName);
  }
}

  function trackWheelModeChange(nextMode, triggerType = "gesture") {
    track("wheel_mode_change", {
      mode: nextMode,
      trigger: triggerType,
    });
  }

  function trackNoteSave(selectedItemsCount, selectedCupItemsCount, mode) {
    track("note_save", {
      flavor_items: selectedItemsCount,
      cup_items: selectedCupItemsCount,
      wheel_mode: mode,
      has_origin: Boolean(originName),
      has_variety: Boolean(varietyName),
      has_roast_day: Boolean(roastDay),
      has_memo: Boolean(memo),
      editing: Boolean(editingNoteId),
    });
  }

  function trackReset() {
    track("wheel_reset", {
      wheel_mode: wheelMode,
      had_flavor_items:
        selectedTopIds.length + selectedMidIds.length + selectedLeafIds.length,
      had_cup_items:
        selectedCupTopIds.length + selectedCupMidIds.length + selectedCupLeafIds.length,
      had_origin: Boolean(originName),
      had_variety: Boolean(varietyName),
      had_roast_day: Boolean(roastDay),
      had_memo: Boolean(memo),
    });
  }
  const data = [
    {
      name: "FRUITY",
      color: "#e74c3c",
      children: [
        {
          name: "BERRY",
          children: ["Blackberry", "Raspberry", "Blueberry", "Strawberry"],
        },
        {
          name: "DRIED FRUIT",
          children: ["Raisin", "Prune"],
        },
        {
          name: "OTHER FRUIT",
          children: [
            "Coconut",
            "Cherry",
            "Pomegranate",
            "Pineapple",
            "Grape",
            "Apple",
            "Peach",
            "Pear",
          ],
        },
        {
          name: "CITRUS FRUIT",
          children: ["Grapefruit", "Orange", "Lemon", "Lime"],
        },
      ],
    },
    {
      name: "SOUR / FERMENTED",
      color: "#d9d300",
      children: [
        {
          name: "SOUR",
          children: [
            "Sour Aromatics",
            "Acetic Acid",
            "Butyric Acid",
            "Isovaleric Acid",
            "Citric Acid",
            "Malic Acid",
          ],
        },
        {
          name: "ALCOHOL / FERMENTED",
          children: ["Winey", "Whiskey", "Fermented", "Overripe"],
        },
      ],
    },
    {
      name: "GREEN / VEGETATIVE",
      color: "#26b54b",
      children: [
        { name: "OLIVE OIL", children: [] },
        { name: "RAW", children: [] },
        {
          name: "GREEN VEGETATIVE",
          children: [
            "Under-ripe",
            "Peapod",
            "Fresh",
            "Dark Green",
            "Vegetative",
            "Hay-like",
            "Herb-like",
          ],
        },
        { name: "BEANY", children: [] },
      ],
    },
    {
      name: "OTHER",
      color: "#1ea1cf",
      children: [
        {
          name: "PAPERY / MUSTY",
          children: [
            "Stale",
            "Cardboard",
            "Papery",
            "Woody",
            "Moldy/Damp",
            "Musty/Dusty",
            "Musty/Earthy",
            "Animalic",
            "Meaty Brothy",
            "Phenolic",
          ],
        },
        {
          name: "CHEMICAL",
          children: ["Rubber", "Skunky", "Petroleum", "Medicinal", "Salty", "Butter"],
        },
      ],
    },
    {
      name: "ROASTED",
      color: "#c23a2b",
      children: [
        { name: "PIPE TOBACCO", children: [] },
        { name: "TOBACCO", children: [] },
        {
          name: "BURNT",
          children: ["Acrid", "Ashy", "Smoky", "Brown Roast"],
        },
        {
          name: "CEREAL",
          children: ["Grain", "Malt"],
        },
      ],
    },
    {
      name: "SPICES",
      color: "#b51e57",
      children: [
        { name: "PUNGENT", children: [] },
        { name: "PEPPER", children: [] },
        {
          name: "BROWN SPICE",
          children: ["Anise", "Nutmeg", "Cinnamon", "Clove"],
        },
      ],
    },
    {
      name: "NUTTY / COCOA",
      color: "#9b8b87",
      children: [
        {
          name: "NUTTY",
          children: ["Peanuts", "Hazelnut", "Almond"],
        },
        {
          name: "COCOA",
          children: ["Chocolate", "Dark Chocolate"],
        },
      ],
    },
    {
      name: "SWEET",
      color: "#f48a1d",
      children: [
        {
          name: "BROWN SUGAR",
          children: ["Molasses", "Maple Syrup", "Caramelized", "Honey"],
        },
        {
          name: "OVERALL SWEET",
          children: ["Vanilla", "Vanillin", "Sweet Aromatics"],
        },
      ],
    },
    {
      name: "FLORAL",
      color: "#ef1495",
      children: [
        { name: "BLACK TEA", children: [] },
        {
          name: "FLORAL",
          children: ["Chamomile", "Rose", "Jasmine"],
        },
      ],
    },
  ];


  const cupProfileData = [
    {
      name: "CUP PROFILE",
      color: "#111827",
      children: [
        {
          name: "SWEETNESS",
          children: ["Candied", "Vanilla", "High"],
        },
        {
          name: "ACIDITY",
          children: ["Balanced", "Light", "Mellow"],
        },
        {
          name: "AROMA",
          children: ["Rounded", "Dense", "Intense"],
        },
        {
          name: "TEXTURE",
          children: ["Syrupy", "Creamy", "Velvety"],
        },
        {
          name: "BODY",
          children: ["Heavy", "Thick", "Round"],
        },
        {
          name: "AFTERTASTE",
          children: ["Lingering", "Long", "Intense", "Rounded"],
        },
      ],
    },
    {
      name: "COFFEE",
      color: "#000000",
      children: [
        {
          name: "PROFILE",
          children: ["Mature / Ripe", "Intense", "Balanced"],
        },
        {
          name: "PASTRY",
          children: ["Nutty", "Cocoa", "Biscuit", "Caramelized"],
        },
        {
          name: "FRUITY",
          children: ["Candied", "Mellow", "Ripe"],
        },
        {
          name: "PROCESS",
          children: ["Washed", "Natural", "Fermented"],
        },
        {
          name: "BEANS",
          children: ["Low density", "Medium", "Single origin"],
        },
        {
          name: "ROAST",
          children: ["Light", "Mid"],
        },
        {
          name: "REPEATABILITY",
          children: ["Mid", "Even", "Easy to brew with"],
        },
        {
          name: "DRAWDOWN",
          children: ["Mid"],
        },
        {
          name: "GRIND",
          children: ["Coarse", "Medium"],
        },
        {
          name: "MODE",
          children: ["Immersion", "Percolation"],
        },
      ],
    },
  ];

  const baseOriginFarmData = [
    {
      country: "Bolivia",
      regions: [
        {
          region: "Caranavi",
          farms: ["Finca Takesi", "La Linda", "Bolinda", "Coproca", "Alasitas"],
        },
      ],
    },
    {
      country: "Brazil",
      regions: [
        {
          region: "Cerrado Mineiro",
          farms: [
            "Daterra",
            "Sertão",
            "São Judas Tadeu",
            "Boa Vista",
            "Pantano",
            "Santa Ines",
          ],
        },
        {
          region: "Sul de Minas",
          farms: [
            "Fazenda Ambiental Fortaleza",
            "Ipanema",
            "Samambaia",
            "Fazenda Rainha",
            "Carmo Estate",
            "Cachoeira",
          ],
        },
        {
          region: "Mogiana",
          farms: ["Alta Mogiana", "Santa Alina", "São Bento", "Bela Vista"],
        },
      ],
    },
    {
      country: "Burundi",
      regions: [
        {
          region: "Kayanza",
          farms: ["Gahahe", "Kibingo", "Mbonerahamwe", "Mikuba", "Butezi"],
        },
        {
          region: "Ngozi",
          farms: ["Heza", "Turihamwe", "Gisakura", "Masha"],
        },
        {
          region: "Muyinga",
          farms: ["Nemba", "Bwayi", "Yandaro"],
        },
      ],
    },
    {
      country: "Colombia",
      regions: [
        {
          region: "Huila",
          farms: [
            "El Paraiso",
            "Las Flores",
            "Finca La Esperanza",
            "Finca El Diviso",
            "La Palma",
            "La Riviera",
          ],
        },
        {
          region: "Nariño",
          farms: ["Aponte Village", "La Union", "El Tambo", "Buesaco", "San Jose"],
        },
        {
          region: "Tolima",
          farms: ["La Leona", "Finca El Mirador", "El Vergel", "La Negrita"],
        },
        {
          region: "Cauca",
          farms: ["Inza", "Popayan Reserve", "La Claudina", "El Tablon"],
        },
        {
          region: "Antioquia",
          farms: ["Santa Barbara Estate", "La Sierra", "Urrao"],
        },
      ],
    },
    {
      country: "Costa Rica",
      regions: [
        {
          region: "Tarrazu",
          farms: ["La Pastora", "Don Mayo", "Las Lajas", "Montes de Oro", "La Minita"],
        },
        {
          region: "West Valley",
          farms: ["Helsar", "Naranjo", "Volcan Azul", "La Candelilla", "Don Eli"],
        },
        {
          region: "Central Valley",
          farms: ["La Hilda", "Valladolid", "Palmichal"],
        },
      ],
    },
    {
      country: "Ecuador",
      regions: [
        {
          region: "Loja",
          farms: ["Finca Soledad", "La Papaya", "El Aguacate", "Acrim"],
        },
        {
          region: "Pichincha",
          farms: ["Sidra", "Perla Negra", "Ninaburo"],
        },
        {
          region: "Zamora Chinchipe",
          farms: ["El Laurel", "Yangana"],
        },
      ],
    },
    {
      country: "El Salvador",
      regions: [
        {
          region: "Apaneca-Ilamatepec",
          farms: ["Los Pirineos", "Las Delicias", "El Molino", "La Reforma", "Santa Leticia"],
        },
        {
          region: "Santa Ana",
          farms: ["Santa Leticia", "Kilimanjaro", "La Providencia", "El Carmen"],
        },
        {
          region: "Alotepec-Metapan",
          farms: ["Matalapa", "La Fany"],
        },
      ],
    },
    {
      country: "Ethiopia",
      regions: [
        {
          region: "Guji",
          farms: [
            "Hambela Wamena",
            "Shakiso",
            "Suke Quto",
            "Kayon Mountain",
            "Buku Abel",
            "Tirtiro Goye",
            "Buku Sayisa",
          ],
        },
        {
          region: "Yirgacheffe",
          farms: [
            "Chelchele",
            "Koke",
            "Idido",
            "Aricha",
            "Worka Sakaro",
            "Halo Beriti",
            "Banko Gotiti",
          ],
        },
        {
          region: "Sidama",
          farms: [
            "Bensa",
            "Bombe",
            "Shantawene",
            "Keramo",
            "Nensebo",
            "Alo",
            "Rumudamo",
          ],
        },
        {
          region: "Limu",
          farms: ["Nano Challa", "Gera", "Biftu Gudina", "Agaro"],
        },
        {
          region: "Jimma",
          farms: ["Duromina", "Nano Genji", "Kolla Bolcha"],
        },
      ],
    },
    {
      country: "Guatemala",
      regions: [
        {
          region: "Huehuetenango",
          farms: ["El Injerto", "La Bolsa", "Buenos Aires", "La Esperanza", "Vista Hermosa"],
        },
        {
          region: "Antigua",
          farms: ["Finca Medina", "Retana", "Filadelfia", "La Azotea", "Pampojila"],
        },
        {
          region: "Atitlan",
          farms: ["Los Volcanes", "El Grano", "San Sebastian"],
        },
        {
          region: "Coban",
          farms: ["Santa Isabel", "Chicacnab", "Actela"],
        },
      ],
    },
    {
      country: "Honduras",
      regions: [
        {
          region: "Santa Barbara",
          farms: ["El Puente", "San Vicente", "La Falda", "El Cedral", "Las Flores"],
        },
        {
          region: "Marcala",
          farms: ["Montecillos", "La Florencia", "Finca Liquidambar", "Los Lirios"],
        },
        {
          region: "Comayagua",
          farms: ["La Valentina", "La Bella"],
        },
      ],
    },
    {
      country: "Indonesia",
      regions: [
        {
          region: "Sumatra",
          farms: ["Lintong", "Takengon", "Onan Ganjang", "Wahana Estate", "Pantan Musara"],
        },
        {
          region: "Java",
          farms: ["Frinsa Estate", "Ijen", "Puntang", "Jampit"],
        },
        {
          region: "Sulawesi",
          farms: ["Toarco", "Kalosi", "Sapan"],
        },
      ],
    },
    {
      country: "Jamaica",
      regions: [
        {
          region: "Blue Mountain",
          farms: ["Clifton Mount", "Mavis Bank", "Silver Hill", "Old Tavern Estate"],
        },
      ],
    },
    {
      country: "Kenya",
      regions: [
        {
          region: "Nyeri",
          farms: ["Karimikui", "Gakuyu-ini", "Muthuaini", "Ichamama", "Gatomboya", "Chinga"],
        },
        {
          region: "Kirinyaga",
          farms: ["Kiangoi", "Kii", "Kaguyu", "Kainamui", "Gichathaini"],
        },
        {
          region: "Muranga",
          farms: ["Kamwangi", "Marumi", "Gondo"],
        },
      ],
    },
    {
      country: "Mexico",
      regions: [
        {
          region: "Chiapas",
          farms: ["Finca Triunfo Verde", "Liquidambar", "Santa Cruz", "La Concordia"],
        },
        {
          region: "Oaxaca",
          farms: ["Pluma Hidalgo", "La Candelaria", "Yegole", "Llano Bonito"],
        },
        {
          region: "Veracruz",
          farms: ["Cozautlan", "Finca Kassandra"],
        },
      ],
    },
    {
      country: "Nicaragua",
      regions: [
        {
          region: "Nueva Segovia",
          farms: ["Los Placeres", "Buenos Aires", "Mama Mina", "Finca Idealista", "La Bendicion"],
        },
        {
          region: "Matagalpa",
          farms: ["Un Regalo de Dios", "La Bendicion", "Limoncillo", "Selva Negra"],
        },
        {
          region: "Jinotega",
          farms: ["La Virgen", "La Pradera", "El Jaguar"],
        },
      ],
    },
    {
      country: "Panama",
      regions: [
        {
          region: "Boquete",
          farms: [
            "Hacienda La Esmeralda",
            "Elida Estate",
            "Don Pepe",
            "Finca Deborah",
            "Auromar",
            "Nuguo",
            "Lerida Estate",
          ],
        },
        {
          region: "Volcan",
          farms: ["Janson", "Nuguo", "Auromar", "Hartmann", "Carmen Estate", "Bambito Estate"],
        },
        {
          region: "Renacimiento",
          farms: ["Kotowa", "Mil Cumbres", "La Mula"],
        },
      ],
    },
    {
      country: "Papua New Guinea",
      regions: [
        {
          region: "Eastern Highlands",
          farms: ["Baroida", "Arokara", "Kianantu", "Goroka"],
        },
        {
          region: "Western Highlands",
          farms: ["Sigri", "Kindeng", "Tairora"],
        },
      ],
    },
    {
      country: "Peru",
      regions: [
        {
          region: "Cajamarca",
          farms: ["La Palma", "El Limon", "Tunki", "La Coipa", "Jose Olaya"],
        },
        {
          region: "Cusco",
          farms: ["Valle Inca", "Yanatile", "Huadquina"],
        },
        {
          region: "Junin",
          farms: ["Pangoa", "Satipo", "Villa Rica"],
        },
      ],
    },
    {
      country: "Rwanda",
      regions: [
        {
          region: "Nyamasheke",
          farms: ["Karambi", "Gitesi", "Kanzu", "Shyira", "Gitwe"],
        },
        {
          region: "Gakenke",
          farms: ["Bumbogo", "Dukunde Kawa", "Ruli"],
        },
        {
          region: "Huye",
          farms: ["Simbi", "Huye Mountain", "Mbizi"],
        },
      ],
    },
    {
      country: "Tanzania",
      regions: [
        {
          region: "Mbeya",
          farms: ["Acacia Hills", "Iyenga", "Mbozi", "Songwe", "Mikofi"],
        },
        {
          region: "Arusha",
          farms: ["Mondul Estate", "Burka Estate", "Arusha Estate"],
        },
        {
          region: "Kilimanjaro",
          farms: ["Machare Estate", "Old Moshi"],
        },
      ],
    },
    {
      country: "Uganda",
      regions: [
        {
          region: "Mount Elgon",
          farms: ["Sipi Falls", "Chema", "Kapchorwa", "Buginyanya", "Bulambuli"],
        },
        {
          region: "Rwenzori",
          farms: ["Bukonzo Dream", "Kisinga", "Nyabirongo"],
        },
      ],
    },
    {
      country: "Yemen",
      regions: [
        {
          region: "Haraz",
          farms: ["Al Hayma", "Bani Ismail", "Haraaz Village Lots", "Wadi Mahyad"],
        },
        {
          region: "Al Udayn",
          farms: ["Ismaili", "Bani Mattar"],
        },
      ],
    },
  ];

  const varietyOptions = [
      "AB3",
      "Anacafe 14",
      "Batian",
      "Bourbon",
      "Bourbon Mayaguez 139",
      "Bourbon Mayaguez 71",
      "BP 534",
      "BP 936",
      "BP 939",
      "BPL10",
      "BRS 1216",
      "BRS 2299",
      "BRS 2314",
      "BRS 2336",
      "BRS 2357",
      "BRS 3137",
      "BRS 3193",
      "BRS 3210",
      "BRS 3213",
      "BRS 3220",
      "Caripe",
      "Casiopea",
      "Catigua MG2",
      "Catimor",
      "Catimor 129",
      "Catisic",
      "Catuai",
      "Caturra",
      "Centroamericano",
      "Costa Rica 95",
      "Cuscatleco",
      "EC15",
      "Esperanza",
      "Evaluna",
      "Fronton",
      "Geisha",
      "Geisha (Panama)",
      "H3",
      "Harar Rwanda",
      "IAPAR 59",
      "IHCAFE 90",
      "INIFAP 00-24",
      "INIFAP 00-28",
      "INIFAP 95-9",
      "INIFAP 97-14",
      "INIFAP 97-15",
      "IPR 103",
      "IPR 107",
      "Jackson 2/1257",
      "Java",
      "K7",
      "Kartika 1",
      "KP423",
      "Lempira",
      "Limani",
      "Maragogipe",
      "Marsellesa",
      "Mibirizi",
      "Milenio",
      "Monte Claro",
      "Mundo Maya",
      "Mundo Novo",
      "NARO-Kituza Robusta 1",
      "NARO-Kituza Robusta 10",
      "NARO-Kituza Robusta 2",
      "NARO-Kituza Robusta 3",
      "NARO-Kituza Robusta 4",
      "NARO-Kituza Robusta 5",
      "NARO-Kituza Robusta 6",
      "NARO-Kituza Robusta 7",
      "NARO-Kituza Robusta 8",
      "NARO-Kituza Robusta 9",
      "Nayarita",
      "Nemaya (Coffea canephora)",
      "Nyasaland",
      "Obata (Red)",
      "Omani",
      "Oro Azteca",
      "Pacamara",
      "Pacas",
      "Pache",
      "Parainema",
      "Paraiso",
      "Perdenia",
      "Pop3303/21",
      "RAB C15",
      "Roubi 1",
      "Roubi 10",
      "Roubi 2",
      "Roubi 4",
      "Roubi 5",
      "Roubi 6",
      "Roubi 7",
      "Roubi 9",
      "Ruiru 11",
      "S4808",
      "S795",
      "SA 237",
      "SL14",
      "SL28",
      "SL34",
      "Sln.1R",
      "Sln.2R",
      "Sln.3R",
      "Sln.5B",
      "Sln.6",
      "Starmaya",
      "T5175",
      "T5296",
      "T8667",
      "Tekisic",
      "TR11",
      "TR4",
      "TR9",
      "TRS1",
      "Typica",
      "Venecia",
      "Villa Sarchi",
      "Xanh lun",
  ];
  const rawDripperOptions = [
  "April Plastic Brewer Blue (ver.2)",
  "Aurli U70 Dripper 01 Porcelain Celadon Blue",
  "BARREL KNOT BARREL no DRIPPER Size: M",
  "BATHTUB COFFEE SIMPLIFY the Brewer",
  "BEANDY Silk Dripper Vermilion",
  "BLUE BOTTLE COFFEE Dripper Blue",
  "CAFEC Conical FLOWER DRIPPER Cup1 White PFD-1",
  "CAFEC FLOWER DRIPPER DEEP 27 (Clear Black) FDD-27CB",
  "CAFEC Trapezoid 101 Orange G-101OR",
  "CAFEC Tritan FLOWER DRIPPER Clear Black 1 Cup TFD-1CB",
  "CAFEDE KONA Time Filter Dripper",
  "Ceado Hoop coffee brewer",
  "Cielito Lindo Conical 30 Single Coffee Dripper Tarachine Clear",
  "COFFEE PLUS RAY FILTER",
  "DAISO Coffee Dripper (Conical, Brown)",
  "DAISO Okonomi Dripper",
  "dotyk dripper series1(original) White",
  "Dragonfly Design Center / TASTER’S COFFEE CT62 Coffee Dripper Black",
  "Dragonfly Design Center / TASTER’S COFFEE CT62 Transit",
  "Dragonfly Design Center / TASTER’S COFFEE DS62 Coffee Dripper Jade Green",
  "Driver adjustable dripper 2-4cup",
  "EASY MOVING MODEL HIVE CO-BRAND EDITION",
  "ELEMENTAL INFINITE Mach Filter",
  "Generic Fisch Scalie-ish Dripper",
  "Graycano Dripper RAW",
  "HARIO Coffee Dripper with scale 01 Clear Grey MA-431 (Bestco)",
  "HARIO Shanghai Colored Glass Dripper V60 Purple VDGP-01-LY-CEX",
  "HARIO Shanghai Masada/Black Thorn Hand Drip Coffee Set",
  "HARIO Shanghai Tritan V60 Dripper VDT-01-TB-CEX",
  "HARIO Taiwan ALPHA DRIPPER",
  "HARIO Taiwan V60 Plastic Coffee Dripper 01 Pang-Yu Liu’s Limited Color VD-01-TOR-TW",
  "HARIO Taiwan x Aurli PURION V60 Coffee Dripper 01",
  "HARIO Taiwan x Aurli Switch Old Rock Mud Dripper 02 Volcano Black",
  "HARIO Taiwan x Tri-Up Coffee FLOW 01 Dripper",
  "Hario Taiwan x Tri-up FLOW 02 Tritan Dripper",
  "HARIO USA V60 Plastic Coffee Dripper 02 – Deep Sea",
  "HARIO V60 Ceramic Dripper 01 CBR",
  "HARIO V60 For Allpress Espresso",
  "HARIO V60 Glass Dripper 01",
  "HARIO Switch × V60 Neo",
  "HARIO Switch",
  "HARIO V60 Neo",
  "HARIO x Captain Stag V60 Dripper A01 Amber",
  "hinonomegama Akane Suzuki Coffee Dripper",
  "HOLZKLOTZ A27 Dripper White",
  "HONEYCOMBX Low Bypass Filter",
  "Kadou M1 Dripper",
  "Kalita Dripper 101 Brown (Vintage 1970-80er)",
  "Kalita Dripper 101 Brown (Vintage after 1980)",
  "Kalita Dripper 101 Light Blue (Vintage 1970-80er)",
  "Kalita Dripper 101 White (Vintage 1970-80er)",
  "Kalita Pastel Dripper Blue",
  "Kalita TSUBAME Wave Dripper WDC-155",
  "Kalita TSUBAME Wave Dripper WDS-155 KB2 Produced by TSUTAYA ELECTRICS",
  "Kalita Wave Dripper MI 185 Sand Black",
  "KINTO SCS brewer 2cups plastic",
  "KONO DRIP MEIJIN TF-20",
  "KONO Meimon Dripper MDN-21 Black 2020",
  "KONO Meimon Dripper MDN-21 Bluegrey (KONO Collection 2023)",
  "KONO Meimon Dripper MDN-21 Clear",
  "KONO Meimon Dripper MDN-21 MInt Green 95th Anniversary",
  "KONO Meimon Dripper MDN-21TMS100 Melon Soda 100th Anniversary",
  "LiLi Ceramic Coffee Dripper 2-4 Cups",
  "LilyDrip LILY Coffee Dripper",
  "Loveramics Flatbed Coffee Dripper Orange",
  "Melitta Petershagen SF-S Deluxe 1×2",
  "Melitta USA Signature Series 1-Cup Pour-Over Coffeemaker – Tritan™ Translucent Red",
  "Melitta Vintage Filter 100 (1950er, 3holes)",
  "Melitta Vintage Filter 101 (1930-1950er, 4holes)",
  "Melitta Vintage Filter 101 Alminium (1930-1950er, 4holes)",
  "Melitta Vintage Filter 102 (1930er, 8holes)",
  "MHW-3BOMBER Meteorite Dripper",
  "Minos Cupcake Dripper Amber",
  "MK STUDIO MK Dripper Onyx Coffee Lab Space Blue",
  "MK STUDIO MK Dripper Unique mix wave Blue/White",
  "MUVNA Hand Brewed Coffee Cone Filter 1-2 Cup",
  "Naturalglaze 50-degree angle filter cup natural glaze coffee filter cup Tianmu red beach color Yingge burning",
  "ODZ ODZdripper Mini Black",
  "OREA Brewer Porcelain",
  "OREA Brewer V2 Mk2",
  "OREA Brewer V3 Basalt Black",
  "OREA Brewer V4 WIDE",
  "ORIGAMI AIR S Turquoise Rogue Wave Blue Limited Edition",
  "ORIGAMI Dripper S [mikage]",
  "ORIGAMI Dripper S [sukumo]",
  "ORIGAMI Ninety Plus Kone 10.1",
  "Rocket Cafe Candy Soaking&Filter Cup Base (LiLi Switch)",
  "Rocket Cafe x Phoebus V60 Coffee Dripper Spiral Sunray Dolphin Ribs",
  "Saint Anthony Industries HASAMI C70 Ceramics Brewer",
  "SUJI Premium Handcrafted Pourover Dripper 01 Orange",
  "Suji Premium Handcrafted SUJI Wave 155 Grey",
  "Suprima Dripper SD1",
  "Tetsuo Kuwabara’s Gray Glaze Coffee Dripper",
  "Timemore Crystal Eye B75 Ceramic Dripper",
  "Timemore Crystal Eye Dripper 01 PC Black",
  "UFO DRIPPER CERAMIC Midnight Black",
  "VERVE COFFEE ROASTERS Dwell Dripper",
  "XIONG & YANG Melody Dripper",
  "zeroHero PCTG Ajustable Speed Dripper",
  "zeroHero Prisma PCTG Dripper Prisma PCTG Dripper",
  "V60",
  "Origami",
  "Kalita Wave",
  "April",
  "Orea",
  "Kono",
  "Torch",
  "Clever",
  "Aeropress",
  "French Press",
  "Nel Drip",
];

const dripperOptions = [...rawDripperOptions].sort((a, b) =>
  a.localeCompare(b, undefined, { sensitivity: "base" })
);

  const [customOriginFarmData, setCustomOriginFarmData] = useState([]);
  const [selectedTopIds, setSelectedTopIds] = useState([]);
  const [selectedMidIds, setSelectedMidIds] = useState([]);
  const [selectedLeafIds, setSelectedLeafIds] = useState([]);
  const [selectedCupTopIds, setSelectedCupTopIds] = useState([]);
  const [selectedCupMidIds, setSelectedCupMidIds] = useState([]);
  const [selectedCupLeafIds, setSelectedCupLeafIds] = useState([]);
  const [wheelMode, setWheelMode] = useState("flavor");
  const [, setRatings] = useState({});
  const [originName, setOriginName] = useState("");
  const [varietyName, setVarietyName] = useState("");
  const [dripperName, setDripperName] = useState("");
  const [memo, setMemo] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);

  const [isOriginPickerOpen, setIsOriginPickerOpen] = useState(false);
  const [isVarietyPickerOpen, setIsVarietyPickerOpen] = useState(false);
  const [tempCountry, setTempCountry] = useState("");
  const [tempRegion, setTempRegion] = useState("");
  const [tempFarm, setTempFarm] = useState("");

  const [newCountryInput, setNewCountryInput] = useState("");
  const [newRegionInput, setNewRegionInput] = useState("");
  const [newFarmInput, setNewFarmInput] = useState("");
  const [varietySearchInput, setVarietySearchInput] = useState("");

  const [roastDay, setRoastDay] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [pickerDay, setPickerDay] = useState("01");
  const [pickerMonth, setPickerMonth] = useState("01");
  const [pickerYear, setPickerYear] = useState("2026");
  const centerTouchStartRef = useRef(null);
  const lastCenterTapRef = useRef({ time: 0, x: 0, y: 0 });
  const wheelSvgRef = useRef(null);

  const size = 980;
  const center = size / 2;
  const viewPadding = 76;

  const r0 = 82;
  const r1 = 170;
  const r2 = 292;

  const outerSquareSize = 20;
  const outerGap = 3;
  const outerSquareDistance = r2 + outerGap + outerSquareSize / 2;
  const baseLabelRadius = outerSquareDistance + outerSquareSize / 2 + 4;

  useEffect(() => {
    const rawNotes = localStorage.getItem("coffeeFlavorNotes");
    if (rawNotes) {
      try {
        setSavedNotes(JSON.parse(rawNotes));
      } catch {
        setSavedNotes([]);
      }
    }

    const rawCustomOrigins = localStorage.getItem("coffeeCustomOriginFarmData");
    if (rawCustomOrigins) {
      try {
        setCustomOriginFarmData(JSON.parse(rawCustomOrigins));
      } catch {
        setCustomOriginFarmData([]);
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function saveCustomOriginsToStorage(next) {
    setCustomOriginFarmData(next);
    localStorage.setItem("coffeeCustomOriginFarmData", JSON.stringify(next));
  }

  function normalizeText(value) {
    return value.trim().replace(/\s+/g, " ");
  }

  function normalizeVarietyKey(value) {
    return normalizeText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "");
  }

  function compareText(a, b) {
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  }

  function mergeOriginData(base, custom) {
    const map = new Map();

    [...base, ...custom].forEach((countryItem) => {
      const countryKey = countryItem.country;
      const lowerCountryKey = countryKey.toLowerCase();

      if (!map.has(lowerCountryKey)) {
        map.set(lowerCountryKey, {
          country: countryItem.country,
          regions: [],
        });
      }

      const currentCountry = map.get(lowerCountryKey);
      const regionMap = new Map(
        currentCountry.regions.map((regionItem) => [regionItem.region.toLowerCase(), regionItem])
      );

      (countryItem.regions || []).forEach((regionItem) => {
        const lowerRegionKey = regionItem.region.toLowerCase();

        if (!regionMap.has(lowerRegionKey)) {
          regionMap.set(lowerRegionKey, { region: regionItem.region, farms: [] });
        }

        const currentRegion = regionMap.get(lowerRegionKey);
        const farmMap = new Map(
          currentRegion.farms.map((farm) => [farm.toLowerCase(), farm])
        );

        (regionItem.farms || []).forEach((farm) => {
          if (!farmMap.has(farm.toLowerCase())) {
            farmMap.set(farm.toLowerCase(), farm);
          }
        });

        currentRegion.farms = Array.from(farmMap.values()).sort(compareText);
        regionMap.set(lowerRegionKey, currentRegion);
      });

      currentCountry.regions = Array.from(regionMap.values()).sort((a, b) =>
        compareText(a.region, b.region)
      );
      map.set(lowerCountryKey, currentCountry);
    });

    return Array.from(map.values()).sort((a, b) => compareText(a.country, b.country));
  }

  const originFarmData = useMemo(
    () => mergeOriginData(baseOriginFarmData, customOriginFarmData),
    [customOriginFarmData, baseOriginFarmData, mergeOriginData]
  );

  const allCountries = useMemo(
    () => originFarmData.map((item) => item.country).sort(compareText),
    [originFarmData]
  );

  const countrySuggestions = useMemo(() => {
    const q = normalizeText(newCountryInput).toLowerCase();
    if (!q) return allCountries.slice(0, 12);
    return allCountries.filter((country) => country.toLowerCase().includes(q)).slice(0, 12);
  }, [allCountries, newCountryInput]);

  const availableRegions = useMemo(() => {
    const countryObj = originFarmData.find(
      (item) => item.country.toLowerCase() === tempCountry.toLowerCase()
    );
    return countryObj ? countryObj.regions.map((r) => r.region).sort(compareText) : [];
  }, [originFarmData, tempCountry]);

  const regionSuggestions = useMemo(() => {
    const q = normalizeText(newRegionInput).toLowerCase();
    if (!tempCountry) return [];
    if (!q) return availableRegions.slice(0, 12);
    return availableRegions.filter((region) => region.toLowerCase().includes(q)).slice(0, 12);
  }, [availableRegions, newRegionInput, tempCountry]);

  const availableFarms = useMemo(() => {
    const countryObj = originFarmData.find(
      (item) => item.country.toLowerCase() === tempCountry.toLowerCase()
    );
    const regionObj = countryObj?.regions.find(
      (item) => item.region.toLowerCase() === tempRegion.toLowerCase()
    );
    return regionObj ? [...regionObj.farms].sort(compareText) : [];
  }, [originFarmData, tempCountry, tempRegion]);

  const farmSuggestions = useMemo(() => {
    const q = normalizeText(newFarmInput).toLowerCase();
    if (!tempCountry || !tempRegion) return [];
    if (!q) return availableFarms.slice(0, 16);
    return availableFarms.filter((farm) => farm.toLowerCase().includes(q)).slice(0, 16);
  }, [availableFarms, newFarmInput, tempCountry, tempRegion]);

  const varietySuggestions = useMemo(() => {
    const q = normalizeText(varietySearchInput);
    const normalizedQ = normalizeVarietyKey(q);
    if (!q) return varietyOptions.slice(0, 60);
    return varietyOptions
      .filter((variety) => {
        const lowerVariety = variety.toLowerCase();
        return lowerVariety.includes(q.toLowerCase()) || normalizeVarietyKey(variety).includes(normalizedQ);
      })
      .slice(0, 60);
  }, [varietySearchInput, normalizeVarietyKey, varietyOptions]);

  useEffect(() => {
    if (tempCountry && !allCountries.some((country) => country.toLowerCase() === tempCountry.toLowerCase())) {
      setTempCountry("");
      setTempRegion("");
      setTempFarm("");
    }
  }, [allCountries, tempCountry]);

  useEffect(() => {
    if (
      tempRegion &&
      !availableRegions.some((region) => region.toLowerCase() === tempRegion.toLowerCase())
    ) {
      setTempRegion("");
      setTempFarm("");
    }
  }, [availableRegions, tempRegion]);

  useEffect(() => {
    if (tempFarm && !availableFarms.some((farm) => farm.toLowerCase() === tempFarm.toLowerCase())) {
      setTempFarm("");
    }
  }, [availableFarms, tempFarm]);

  function pad2(value) {
    return String(value).padStart(2, "0");
  }

  function getTodayParts() {
    const now = new Date();
    return {
      day: pad2(now.getDate()),
      month: pad2(now.getMonth() + 1),
      year: String(now.getFullYear()),
    };
  }

  function getDaysInMonth(month, year) {
    return new Date(Number(year), Number(month), 0).getDate();
  }

  function parseStoredDate(value) {
    const today = getTodayParts();
    if (!value) return today;

    const parts = value.split("/").map((item) => item.trim());
    if (parts.length !== 3) return today;

    const [d, m, y] = parts.map(Number);

    if (!Number.isInteger(d) || !Number.isInteger(m) || !Number.isInteger(y)) {
      return today;
    }

    if (m < 1 || m > 12) return today;

    const maxDay = getDaysInMonth(m, y);
    if (d < 1 || d > maxDay) return today;

    return {
      day: pad2(d),
      month: pad2(m),
      year: String(y),
    };
  }

  const monthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => pad2(i + 1)),
    []
  );

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 21 }, (_, i) => String(currentYear - 10 + i));
  }, []);

  const dayOptions = useMemo(() => {
    const maxDay = getDaysInMonth(pickerMonth, pickerYear);
    return Array.from({ length: maxDay }, (_, i) => pad2(i + 1));
  }, [pickerMonth, pickerYear]);

  useEffect(() => {
    const maxDay = getDaysInMonth(pickerMonth, pickerYear);
    if (Number(pickerDay) > maxDay) {
      setPickerDay(pad2(maxDay));
    }
  }, [pickerMonth, pickerYear, pickerDay]);

  function openRoastDayPicker() {
    const parsed = parseStoredDate(roastDay);
    setPickerDay(parsed.day);
    setPickerMonth(parsed.month);
    setPickerYear(parsed.year);
    setIsDatePickerOpen(true);
  }

  function confirmRoastDay() {
    const maxDay = getDaysInMonth(pickerMonth, pickerYear);
    const safeDay = Math.min(Number(pickerDay), maxDay);
    setRoastDay(`${pad2(safeDay)}/${pickerMonth}/${pickerYear}`);
    setIsDatePickerOpen(false);
  }

  function parseOriginName(value) {
    if (!value) return { country: "", region: "", farm: "" };
    const parts = value.split("/").map((item) => normalizeText(item));
    return {
      country: parts[0] || "",
      region: parts[1] || "",
      farm: parts[2] || "",
    };
  }

  function buildOriginLabel(country, region, farm) {
    return [country, region, farm].filter(Boolean).join(" / ");
  }

  function openOriginPicker() {
    const parsed = parseOriginName(originName);
    setTempCountry(parsed.country);
    setTempRegion(parsed.region);
    setTempFarm(parsed.farm);
    setNewCountryInput(parsed.country || "");
    setNewRegionInput(parsed.region || "");
    setNewFarmInput(parsed.farm || "");
    setIsOriginPickerOpen(true);
  }

  function openVarietyPicker() {
    setVarietySearchInput(varietyName || "");
    setIsVarietyPickerOpen(true);
  }

  function confirmVarietySelection() {
    const normalized = normalizeText(varietySearchInput);
    const normalizedKey = normalizeVarietyKey(normalized);
    const matched = varietyOptions.find(
      (variety) =>
        variety.toLowerCase() === normalized.toLowerCase() ||
        normalizeVarietyKey(variety) === normalizedKey
    );
    setVarietyName(matched || normalized);
    setIsVarietyPickerOpen(false);
  }

  function upsertCountryInCustom(list, countryName) {
    const exists = list.some((item) => item.country.toLowerCase() === countryName.toLowerCase());
    if (exists) return list;
    return [...list, { country: countryName, regions: [] }];
  }

  function upsertRegionInCustom(list, countryName, regionName) {
    const next = [...list];
    const countryIndex = next.findIndex(
      (item) => item.country.toLowerCase() === countryName.toLowerCase()
    );

    if (countryIndex === -1) {
      next.push({
        country: countryName,
        regions: [{ region: regionName, farms: [] }],
      });
      return next;
    }

    const country = { ...next[countryIndex] };
    const regionExists = country.regions.some(
      (item) => item.region.toLowerCase() === regionName.toLowerCase()
    );

    if (!regionExists) {
      country.regions = [...country.regions, { region: regionName, farms: [] }];
      next[countryIndex] = country;
    }

    return next;
  }

  function upsertFarmInCustom(list, countryName, regionName, farmName) {
    let next = upsertRegionInCustom(list, countryName, regionName);
    next = [...next];

    const countryIndex = next.findIndex(
      (item) => item.country.toLowerCase() === countryName.toLowerCase()
    );
    if (countryIndex === -1) return next;

    const country = { ...next[countryIndex] };
    const regionIndex = country.regions.findIndex(
      (item) => item.region.toLowerCase() === regionName.toLowerCase()
    );
    if (regionIndex === -1) return next;

    const region = { ...country.regions[regionIndex] };
    const farmExists = region.farms.some((farm) => farm.toLowerCase() === farmName.toLowerCase());

    if (!farmExists) {
      region.farms = [...region.farms, farmName];
      country.regions = [...country.regions];
      country.regions[regionIndex] = region;
      next[countryIndex] = country;
    }

    return next;
  }

  function handleAddCountry() {
    const value = normalizeText(newCountryInput);
    if (!value) return;

    const matchedExisting = allCountries.find(
      (country) => country.toLowerCase() === value.toLowerCase()
    );
    const finalCountry = matchedExisting || value;

    const next = upsertCountryInCustom(customOriginFarmData, finalCountry);
    saveCustomOriginsToStorage(next);
    setTempCountry(finalCountry);
    setTempRegion("");
    setTempFarm("");
    setNewCountryInput(finalCountry);
    setNewRegionInput("");
    setNewFarmInput("");
  }

  function handleAddRegion() {
    const value = normalizeText(newRegionInput);
    if (!tempCountry || !value) return;

    const matchedExisting = availableRegions.find(
      (region) => region.toLowerCase() === value.toLowerCase()
    );
    const finalRegion = matchedExisting || value;

    const next = upsertRegionInCustom(customOriginFarmData, tempCountry, finalRegion);
    saveCustomOriginsToStorage(next);
    setTempRegion(finalRegion);
    setTempFarm("");
    setNewRegionInput(finalRegion);
    setNewFarmInput("");
  }

  function handleAddFarm() {
    const value = normalizeText(newFarmInput);
    if (!tempCountry || !tempRegion || !value) return;

    const matchedExisting = availableFarms.find(
      (farm) => farm.toLowerCase() === value.toLowerCase()
    );
    const finalFarm = matchedExisting || value;

    const next = upsertFarmInCustom(customOriginFarmData, tempCountry, tempRegion, finalFarm);
    saveCustomOriginsToStorage(next);
    setTempFarm(finalFarm);
    setNewFarmInput(finalFarm);
  }

  function confirmOriginSelection() {
    setOriginName(buildOriginLabel(tempCountry, tempRegion, tempFarm));
    setIsOriginPickerOpen(false);
  }

  function topId(topName) {
    return `top::${topName}`;
  }

  function midId(topName, midName) {
    return `mid::${topName}::${midName}`;
  }

  function leafId(topName, midName, leafName) {
    return `leaf::${topName}::${midName}::${leafName}`;
  }

  function cupTopId(topName) {
    return `cup-top::${topName}`;
  }

  function cupMidId(topName, midName) {
    return `cup-mid::${topName}::${midName}`;
  }

  function cupLeafId(topName, midName, leafName) {
    return `cup-leaf::${topName}::${midName}::${leafName}`;
  }

  function polar(cx, cy, r, angle) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function arcPath(innerR, outerR, startAngle, endAngle) {
    const p1 = polar(center, center, outerR, startAngle);
    const p2 = polar(center, center, outerR, endAngle);
    const p3 = polar(center, center, innerR, endAngle);
    const p4 = polar(center, center, innerR, startAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${p1.x} ${p1.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
      `L ${p3.x} ${p3.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
      "Z",
    ].join(" ");
  }

  function textPosition(innerR, outerR, startAngle, endAngle, radiusBias = 0.5) {
    const mid = (startAngle + endAngle) / 2;
    const radius = innerR + (outerR - innerR) * radiusBias;
    const pos = polar(center, center, radius, mid);
    return { ...pos, angle: mid };
  }

  function outerLabelPosition(startAngle, endAngle, radiusAdjust = 0) {
    const mid = (startAngle + endAngle) / 2;
    const pos = polar(center, center, baseLabelRadius + radiusAdjust, mid);
    return { ...pos, angle: mid };
  }

  function squareCenterPosition(startAngle, endAngle) {
    const mid = (startAngle + endAngle) / 2;
    const pos = polar(center, center, outerSquareDistance, mid);
    return { ...pos, angle: mid };
  }

  function formatLabel(label) {
    return label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function splitSlashLabel(label) {
    const formatted = formatLabel(label);
    const parts = formatted.split(/\s*\/\s*/);
    if (parts.length === 2) {
      return [parts[0].trim(), `/ ${parts[1].trim()}`];
    }
    return [formatted];
  }

  function hasSlash(label) {
    return label.includes("/");
  }

  function getReadableRotation(angle) {
    const normalized = ((angle % 360) + 360) % 360;
    let rotation = angle - 90;
    if (normalized > 180) rotation += 180;
    return rotation;
  }

  function getOuterLabelAnchor(angle) {
    const normalized = ((angle % 360) + 360) % 360;
    return normalized <= 180 ? "start" : "end";
  }

  function topSelectionFill(hex, active, hasAnySelected) {
    if (!hasAnySelected) return `${hex}cc`;
    return active ? hex : `${hex}3d`;
  }

  function selectionOnlyFill(hex, active, enabled) {
    if (!enabled) return `${hex}22`;
    return active ? hex : `${hex}55`;
  }

  function selectionOnlyTextColor(hex, active, enabled) {
    if (!enabled) return `${hex}55`;
    return active ? hex : `${hex}55`;
  }

  function removeRating(id) {
    setRatings((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function clearMidAndLeafUnderTop(topName) {
    const midsToRemove = [];
    const leavesToRemove = [];

    data.forEach((top) => {
      if (top.name !== topName) return;
      top.children.forEach((mid) => {
        midsToRemove.push(midId(top.name, mid.name));
        const leaves = mid.children && mid.children.length > 0 ? mid.children : [];
        leaves.forEach((leaf) => {
          leavesToRemove.push(leafId(top.name, mid.name, leaf));
        });
      });
    });

    setSelectedMidIds((prev) => prev.filter((id) => !midsToRemove.includes(id)));
    setSelectedLeafIds((prev) => prev.filter((id) => !leavesToRemove.includes(id)));

    setRatings((prev) => {
      const next = { ...prev };
      midsToRemove.forEach((id) => delete next[id]);
      leavesToRemove.forEach((id) => delete next[id]);
      return next;
    });
  }

  function clearLeafUnderMid(topName, midName) {
    const leavesToRemove = [];

    data.forEach((top) => {
      if (top.name !== topName) return;
      top.children.forEach((mid) => {
        if (mid.name !== midName) return;
        const leaves = mid.children && mid.children.length > 0 ? mid.children : [];
        leaves.forEach((leaf) => {
          leavesToRemove.push(leafId(top.name, mid.name, leaf));
        });
      });
    });

    setSelectedLeafIds((prev) => prev.filter((id) => !leavesToRemove.includes(id)));

    setRatings((prev) => {
      const next = { ...prev };
      leavesToRemove.forEach((id) => delete next[id]);
      return next;
    });
  }

 function toggleTop(topName) {
  const id = topId(topName);
  const exists = selectedTopIds.includes(id);

  if (exists) {
    setSelectedTopIds((prev) => prev.filter((x) => x !== id));
    removeRating(id);
    clearMidAndLeafUnderTop(topName);

    trackWheelSelection({
      wheel: "flavor",
      level: "top",
      action: "deselect",
      topName,
    });

  } else {
    setSelectedTopIds((prev) => [...prev, id]);

    trackWheelSelection({
      wheel: "flavor",
      level: "top",
      action: "select",
      topName,
    });
  }
}

  function toggleMid(topName, midName) {
  const parentTopId = topId(topName);
  if (!selectedTopIds.includes(parentTopId)) return;

  const id = midId(topName, midName);
  const exists = selectedMidIds.includes(id);

  if (exists) {
    setSelectedMidIds((prev) => prev.filter((x) => x !== id));
    removeRating(id);
    clearLeafUnderMid(topName, midName);

    trackWheelSelection({
      wheel: "flavor",
      level: "mid",
      action: "deselect",
      topName,
      midName,
    });
  } else {
    setSelectedMidIds((prev) => [...prev, id]);

    trackWheelSelection({
      wheel: "flavor",
      level: "mid",
      action: "select",
      topName,
      midName,
    });
  }
}

  function toggleLeaf(topName, midName, leafName) {
  const parentTopId = topId(topName);
  const parentMidId = midId(topName, midName);

  if (!selectedTopIds.includes(parentTopId)) return;
  if (!selectedMidIds.includes(parentMidId)) return;

  const id = leafId(topName, midName, leafName);
  const exists = selectedLeafIds.includes(id);

  if (exists) {
    setSelectedLeafIds((prev) => prev.filter((x) => x !== id));
    removeRating(id);

    trackWheelSelection({
      wheel: "flavor",
      level: "leaf",
      action: "deselect",
      topName,
      midName,
      leafName,
    });
  } else {
    setSelectedLeafIds((prev) => [...prev, id]);

    trackWheelSelection({
      wheel: "flavor",
      level: "leaf",
      action: "select",
      topName,
      midName,
      leafName,
    });
  }
}

  function labelFromId(id) {
    const parts = id.split("::");
    return parts[parts.length - 1];
  }

  function getColorFromId(id) {
    const parts = id.split("::");
    if (parts.length < 2) return "#9ca3af";
    const topName = parts[1];
    const top = data.find((item) => item.name === topName);
    return top ? top.color : "#9ca3af";
  }

  function getCupColorFromId(id) {
    const parts = id.split("::");
    if (parts.length < 2) return "#374151";
    const topName = parts[1];
    const top = cupProfileData.find((item) => item.name === topName);
    return top ? top.color : "#374151";
  }

  function getDominantColorFromNote(note) {
    if (!note.items || note.items.length === 0) return "#f9fafb";

    const colorCount = {};

    note.items.forEach((item) => {
      const color = getColorFromId(item.id);
      if (!colorCount[color]) {
        colorCount[color] = 0;
      }
      colorCount[color] += 1;
    });

    let dominantColor = null;
    let maxCount = 0;

    Object.entries(colorCount).forEach(([color, count]) => {
      if (count > maxCount) {
        dominantColor = color;
        maxCount = count;
      }
    });

    return dominantColor ? `${dominantColor}22` : "#f9fafb";
  }

  function getMidItemsWithoutChildren() {
    const items = [];
    data.forEach((top) => {
      top.children.forEach((mid) => {
        if (!mid.children || mid.children.length === 0) {
          items.push({
            id: midId(top.name, mid.name),
            label: formatLabel(mid.name),
            color: top.color,
          });
        }
      });
    });
    return items;
  }

  function getCupMidItemsWithoutChildren() {
    const items = [];
    cupProfileData.forEach((top) => {
      top.children.forEach((mid) => {
        if (!mid.children || mid.children.length === 0) {
          items.push({
            id: cupMidId(top.name, mid.name),
            label: formatLabel(mid.name),
            color: top.color,
          });
        }
      });
    });
    return items;
  }


  function clearCupLeafUnderMid(topName, midName) {
    const leavesToRemove = [];

    cupProfileData.forEach((top) => {
      if (top.name !== topName) return;
      top.children.forEach((mid) => {
        if (mid.name !== midName) return;
        const leaves = mid.children && mid.children.length > 0 ? mid.children : [];
        leaves.forEach((leaf) => {
          leavesToRemove.push(cupLeafId(top.name, mid.name, leaf));
        });
      });
    });

    setSelectedCupLeafIds((prev) => prev.filter((id) => !leavesToRemove.includes(id)));
  }

  function clearCupMidAndLeafUnderTop(topName) {
    const midsToRemove = [];
    const leavesToRemove = [];

    cupProfileData.forEach((top) => {
      if (top.name !== topName) return;
      top.children.forEach((mid) => {
        midsToRemove.push(cupMidId(top.name, mid.name));
        const leaves = mid.children && mid.children.length > 0 ? mid.children : [];
        leaves.forEach((leaf) => {
          leavesToRemove.push(cupLeafId(top.name, mid.name, leaf));
        });
      });
    });

    setSelectedCupMidIds((prev) => prev.filter((id) => !midsToRemove.includes(id)));
    setSelectedCupLeafIds((prev) => prev.filter((id) => !leavesToRemove.includes(id)));
  }

  function toggleCupTop(topName) {
    const id = cupTopId(topName);
    const exists = selectedCupTopIds.includes(id);

    if (exists) {
      setSelectedCupTopIds((prev) => prev.filter((x) => x !== id));
      clearCupMidAndLeafUnderTop(topName);
    } else {
      setSelectedCupTopIds((prev) => [...prev, id]);
    }
  }

  function toggleCupMid(topName, midName) {
    const parentTopId = cupTopId(topName);
    if (!selectedCupTopIds.includes(parentTopId)) return;

    const id = cupMidId(topName, midName);
    const exists = selectedCupMidIds.includes(id);

    if (exists) {
      setSelectedCupMidIds((prev) => prev.filter((x) => x !== id));
      clearCupLeafUnderMid(topName, midName);
    } else {
      setSelectedCupMidIds((prev) => [...prev, id]);
    }
  }

  function toggleCupLeaf(topName, midName, leafName) {
    const parentTopId = cupTopId(topName);
    const parentMidId = cupMidId(topName, midName);

    if (!selectedCupTopIds.includes(parentTopId)) return;
    if (!selectedCupMidIds.includes(parentMidId)) return;

    const id = cupLeafId(topName, midName, leafName);
    const exists = selectedCupLeafIds.includes(id);

    if (exists) {
      setSelectedCupLeafIds((prev) => prev.filter((x) => x !== id));
    } else {
      setSelectedCupLeafIds((prev) => [...prev, id]);
    }
  }

  function toggleWheelMode(triggerType = "gesture") {
  setWheelMode((prev) => {
    const nextMode = prev === "flavor" ? "cup" : "flavor";
    trackWheelModeChange(nextMode, triggerType);
    return nextMode;
  });
}

  function handleCenterTouchStart(event) {
    const touch = event.touches?.[0];
    if (!touch) return;
    centerTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleCenterTouchEnd(event) {
    const start = centerTouchStartRef.current;
    const touch = event.changedTouches?.[0];
    centerTouchStartRef.current = null;

    if (!touch) return;

    if (start) {
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 28) {
        lastCenterTapRef.current = { time: 0, x: 0, y: 0 };
        toggleWheelMode();
        return;
      }
    }

    const now = Date.now();
    const last = lastCenterTapRef.current;
    const dxFromLast = touch.clientX - last.x;
    const dyFromLast = touch.clientY - last.y;
    const closeEnough = Math.sqrt(dxFromLast * dxFromLast + dyFromLast * dyFromLast) < 28;

    if (now - last.time < 320 && closeEnough) {
      lastCenterTapRef.current = { time: 0, x: 0, y: 0 };
      toggleWheelMode();
      return;
    }

    lastCenterTapRef.current = {
      time: now,
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  function handleCenterClick(event) {
    const now = Date.now();
    const last = lastCenterTapRef.current;
    const x = event.clientX || 0;
    const y = event.clientY || 0;
    const dx = x - last.x;
    const dy = y - last.y;
    const closeEnough = Math.sqrt(dx * dx + dy * dy) < 28;

    if (now - last.time < 320 && closeEnough) {
      lastCenterTapRef.current = { time: 0, x: 0, y: 0 };
      toggleWheelMode();
      return;
    }

    lastCenterTapRef.current = { time: now, x, y };
  }

  function saveNote() {
    const selectedItems = [
      ...selectedTopIds.map((id) => ({ id, level: "top" })),
      ...selectedMidIds.map((id) => ({ id, level: "mid" })),
      ...selectedLeafIds.map((id) => ({ id, level: "leaf" })),
    ];

    const selectedCupItems = [
      ...selectedCupTopIds.map((id) => ({ id, level: "top" })),
      ...selectedCupMidIds.map((id) => ({ id, level: "mid" })),
      ...selectedCupLeafIds.map((id) => ({ id, level: "leaf" })),
    ];

    if (selectedItems.length === 0) {
      alert("Select at least one item before saving.");
      return;
    }

    trackNoteSave(selectedItems.length, selectedCupItems.length, wheelMode);

    const nowString = new Date().toLocaleString();

    if (editingNoteId) {
      const next = savedNotes.map((note) =>
        note.id === editingNoteId
          ? {
              ...note,
        beanName: originName || "Untitled Coffee",
varietyName,
dripperName,
roastDay,
memo,
              updatedAt: nowString,
              items: selectedItems.map((item) => ({
                id: item.id,
                level: item.level,
                name: labelFromId(item.id),
              })),
              cupItems: selectedCupItems.map((item) => ({
                id: item.id,
                level: item.level,
                name: labelFromId(item.id),
              })),
            }
          : note
      );

      setSavedNotes(next);
      localStorage.setItem("coffeeFlavorNotes", JSON.stringify(next));
      clearCurrentSelection();
      return;
    }

    const note = {
      id: Date.now(),
      createdAt: nowString,
      updatedAt: "",
   beanName: originName || "Untitled Coffee",
varietyName,
roastDay,
memo,
      items: selectedItems.map((item) => ({
        id: item.id,
        level: item.level,
        name: labelFromId(item.id),
      })),
      cupItems: selectedCupItems.map((item) => ({
        id: item.id,
        level: item.level,
        name: labelFromId(item.id),
      })),
    };

    const next = [note, ...savedNotes];
    setSavedNotes(next);
    localStorage.setItem("coffeeFlavorNotes", JSON.stringify(next));
    clearCurrentSelection();
  }

  function clearCurrentSelection() {
    trackReset();
    setSelectedTopIds([]);
    setSelectedMidIds([]);
    setSelectedLeafIds([]);
    setSelectedCupTopIds([]);
    setSelectedCupMidIds([]);
    setSelectedCupLeafIds([]);
    setWheelMode("flavor");
    setRatings({});
    setOriginName("");
    setVarietyName("");
    setDripperName("")
    setVarietySearchInput("");
    setVarietySearchInput("");
    setRoastDay("");
    setMemo("");
    setEditingNoteId(null);
  }

  function deleteSavedNote(id) {
    const next = savedNotes.filter((note) => note.id !== id);
    setSavedNotes(next);
    localStorage.setItem("coffeeFlavorNotes", JSON.stringify(next));

    if (editingNoteId === id) {
      clearCurrentSelection();
    }
  }

  function editSavedNote(note) {
    const topIds = note.items.filter((item) => item.level === "top").map((item) => item.id);
    const midIds = note.items.filter((item) => item.level === "mid").map((item) => item.id);
    const leafIds = note.items.filter((item) => item.level === "leaf").map((item) => item.id);
    const cupItems = note.cupItems || [];
    const cupTopIds = cupItems.filter((item) => item.level === "top").map((item) => item.id);
    const cupMidIds = cupItems.filter((item) => item.level === "mid").map((item) => item.id);
    const cupLeafIds = cupItems.filter((item) => item.level === "leaf").map((item) => item.id);

    setSelectedTopIds(topIds);
    setSelectedMidIds(midIds);
    setSelectedLeafIds(leafIds);
    setSelectedCupTopIds(cupTopIds);
    setSelectedCupMidIds(cupMidIds);
    setSelectedCupLeafIds(cupLeafIds);
    setWheelMode(cupItems.length > 0 ? "cup" : "flavor");
    setOriginName(note.beanName === "Untitled Coffee" ? "" : note.beanName);
    setVarietyName(note.varietyName || "");
    setDripperName(note.dripperName || "");
    setVarietySearchInput(note.varietyName || "");
    setRoastDay(note.roastDay || "");
    setMemo(note.memo || "");
    setEditingNoteId(note.id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  async function svgToPngDataUrl(svgElement) {
  if (!svgElement) {
    throw new Error("Wheel SVG not found");
  }

  const clone = svgElement.cloneNode(true);

  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  const viewBox = svgElement.getAttribute("viewBox");
  const width =
    svgElement.viewBox?.baseVal?.width ||
    svgElement.getBoundingClientRect().width ||
    1200;
  const height =
    svgElement.viewBox?.baseVal?.height ||
    svgElement.getBoundingClientRect().height ||
    1200;

  if (!clone.getAttribute("viewBox") && viewBox) {
    clone.setAttribute("viewBox", viewBox);
  }

  clone.setAttribute("width", String(width));
  clone.setAttribute("height", String(height));

  const svgString = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = svgUrl;
    });

    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}
async function handleNotePdf(note) {
  try {
    const prevSelectedTopIds = [...selectedTopIds];
    const prevSelectedMidIds = [...selectedMidIds];
    const prevSelectedLeafIds = [...selectedLeafIds];
    const prevSelectedCupTopIds = [...selectedCupTopIds];
    const prevSelectedCupMidIds = [...selectedCupMidIds];
    const prevSelectedCupLeafIds = [...selectedCupLeafIds];
    const prevWheelMode = wheelMode;

    const noteTopIds = note.items.filter((item) => item.level === "top").map((item) => item.id);
    const noteMidIds = note.items.filter((item) => item.level === "mid").map((item) => item.id);
    const noteLeafIds = note.items.filter((item) => item.level === "leaf").map((item) => item.id);

    const noteCupItems = note.cupItems || [];
    const noteCupTopIds = noteCupItems.filter((item) => item.level === "top").map((item) => item.id);
    const noteCupMidIds = noteCupItems.filter((item) => item.level === "mid").map((item) => item.id);
    const noteCupLeafIds = noteCupItems.filter((item) => item.level === "leaf").map((item) => item.id);

    setSelectedTopIds(noteTopIds);
    setSelectedMidIds(noteMidIds);
    setSelectedLeafIds(noteLeafIds);
    setSelectedCupTopIds(noteCupTopIds);
    setSelectedCupMidIds(noteCupMidIds);
    setSelectedCupLeafIds(noteCupLeafIds);
    setWheelMode(noteCupItems.length > 0 ? "cup" : "flavor");

    await new Promise((resolve) => setTimeout(resolve, 80));

    const wheelImage = await svgToPngDataUrl(wheelSvgRef.current);

    const blob = await pdf(
      <FlavorWheelPDFDocument
        note={note}
        wheelImage={wheelImage}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    window.open(url);

    setSelectedTopIds(prevSelectedTopIds);
    setSelectedMidIds(prevSelectedMidIds);
    setSelectedLeafIds(prevSelectedLeafIds);
    setSelectedCupTopIds(prevSelectedCupTopIds);
    setSelectedCupMidIds(prevSelectedCupMidIds);
    setSelectedCupLeafIds(prevSelectedCupLeafIds);
    setWheelMode(prevWheelMode);
  } catch (error) {
    console.error(error);
    alert("PDF用のホイール画像を作れませんでした");
  }
}
  function getTopWeight(top) {
    const leafCount = top.children.reduce((sum, mid) => {
      const count = mid.children?.length ? mid.children.length : 1;
      return sum + count;
    }, 0);
    const midCount = top.children.length;
    return leafCount + midCount * 1.35;
  }

  const topLayout = useMemo(() => {
    const weights = data.map((top) => getTopWeight(top));
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    let cursor = 0;
    return data.map((top, index) => {
      const span = (weights[index] / totalWeight) * 360;
      const start = cursor;
      const end = cursor + span;
      cursor = end;
      return { name: top.name, start, end, span };
    });
  }, [data]);


  function getCupTopWeight(top) {
    const leafCount = top.children.reduce((sum, mid) => {
      const count = mid.children?.length ? mid.children.length : 1;
      return sum + count;
    }, 0);
    const midCount = top.children.length;
    return leafCount + midCount * 1.35;
  }

  const cupTopLayout = useMemo(() => {
    const weights = cupProfileData.map((top) => getCupTopWeight(top));
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    let cursor = 0;
    return cupProfileData.map((top, index) => {
      const span = (weights[index] / totalWeight) * 360;
      const start = cursor;
      const end = cursor + span;
      cursor = end;
      return { name: top.name, start, end, span };
    });
  }, [cupProfileData]);

  const selectedItemsForPanel = useMemo(() => {
    const leafItems = selectedLeafIds.map((id) => ({
      id,
      label: formatLabel(labelFromId(id)),
      color: getColorFromId(id),
    }));

    const midItemsWithoutChildren = getMidItemsWithoutChildren()
      .filter((item) => selectedMidIds.includes(item.id))
      .map((item) => ({
        id: item.id,
        label: item.label,
        color: item.color,
      }));

    return [...midItemsWithoutChildren, ...leafItems];
  }, [selectedLeafIds, selectedMidIds, getMidItemsWithoutChildren]);


  const selectedCupItemsForPanel = useMemo(() => {
    const leafItems = selectedCupLeafIds.map((id) => ({
      id,
      label: formatLabel(labelFromId(id)),
      color: getCupColorFromId(id),
    }));

    const midItemsWithoutChildren = getCupMidItemsWithoutChildren()
      .filter((item) => selectedCupMidIds.includes(item.id))
      .map((item) => ({
        id: item.id,
        label: item.label,
        color: item.color,
      }));

    return [...midItemsWithoutChildren, ...leafItems];
  }, [selectedCupLeafIds, selectedCupMidIds, getCupMidItemsWithoutChildren]);

  const cupQuickSummary = useMemo(() => {
    const grouped = {};

    selectedCupItemsForPanel.forEach((item) => {
      const parts = item.id.split("::");
      const topName = parts[1] || "OTHER";
      if (!grouped[topName]) {
        grouped[topName] = [];
      }
      grouped[topName].push(item.label);
    });

    const sections = Object.entries(grouped)
      .filter(([, labels]) => labels.length > 0)
      .map(([group, labels]) => `${formatLabel(group)}: ${labels.join(", ")}`);

    return sections.join(" / ");
  }, [selectedCupItemsForPanel]);

  const wheel = useMemo(() => {
    const topSegments = [];
    const midSegments = [];
    const leafSquares = [];
    const outerLabels = [];

    const hasAnyTopSelected = selectedTopIds.length > 0;

    data.forEach((top) => {
      const layout = topLayout.find((item) => item.name === top.name);
      const topStart = layout.start;
      const topEnd = layout.end;
      const topSpan = layout.span;

      const topSelectionId = topId(top.name);
      const topActive = selectedTopIds.includes(topSelectionId);

      topSegments.push({
        key: topSelectionId,
        lines: hasSlash(top.name) ? splitSlashLabel(top.name) : [formatLabel(top.name)],
        path: arcPath(r0, r1, topStart, topEnd),
        fill: topSelectionFill(top.color, topActive, hasAnyTopSelected),
        text: textPosition(r0, r1, topStart, topEnd, 0.53),
        onClick: () => toggleTop(top.name),
        strokeWidth: topActive ? 3 : 2,
        fontSize: topSpan < 26 ? 9.6 : topSpan < 36 ? 10.8 : 11.5,
      });

      const mids = top.children;
      const midWeights = mids.map((mid) => (mid.children?.length ? mid.children.length : 1));
      const midWeightTotal = midWeights.reduce((sum, w) => sum + w, 0);

      let midCursor = topStart;

      mids.forEach((mid, midIndex) => {
        const midSpan = (midWeights[midIndex] / midWeightTotal) * (topEnd - topStart);
        const midStart = midCursor;
        const midEnd = midCursor + midSpan;

        const midSelectionId = midId(top.name, mid.name);
        const midEnabled = selectedTopIds.includes(topSelectionId);
        const midActive = selectedMidIds.includes(midSelectionId);
        const leaves = mid.children || [];

        midSegments.push({
          key: midSelectionId,
          lines: hasSlash(mid.name) ? splitSlashLabel(mid.name) : [formatLabel(mid.name)],
          path: arcPath(r1, r2, midStart, midEnd),
          fill: selectionOnlyFill(top.color, midActive, midEnabled),
          text: textPosition(r1, r2, midStart, midEnd, 0.51),
          onClick: () => toggleMid(top.name, mid.name),
          strokeWidth: midActive ? 3 : 2,
          fontSize: midSpan < 16 ? 8.2 : midSpan < 28 ? 9.1 : 10.3,
        });

        if (leaves.length > 0) {
          const leafSpan = (midEnd - midStart) / leaves.length;
          let leafCursor = midStart;

          leaves.forEach((leaf) => {
            const leafStart = leafCursor;
            const leafEnd = leafCursor + leafSpan;
            const leafSelectionId = leafId(top.name, mid.name, leaf);
            const leafEnabled =
              selectedTopIds.includes(topSelectionId) && selectedMidIds.includes(midSelectionId);
            const leafActive = selectedLeafIds.includes(leafSelectionId);
            const squareCenter = squareCenterPosition(leafStart, leafEnd);

            leafSquares.push({
              key: leafSelectionId,
              x: squareCenter.x,
              y: squareCenter.y,
              angle: squareCenter.angle,
              size: outerSquareSize,
              fill: selectionOnlyFill(top.color, leafActive, leafEnabled),
              strokeWidth: leafActive ? 2.2 : 1.15,
              onClick: () => toggleLeaf(top.name, mid.name, leaf),
            });

            let labelFontSize = 9.2;
            if (leafSpan < 6.5) labelFontSize = 6.8;
            else if (leafSpan < 8) labelFontSize = 7.2;
            else if (leafSpan < 10) labelFontSize = 7.8;
            else if (leafSpan < 12) labelFontSize = 8.4;
            else if (leafSpan < 15) labelFontSize = 8.9;

            outerLabels.push({
              key: `label-${leafSelectionId}`,
              label: formatLabel(leaf),
              text: outerLabelPosition(leafStart, leafEnd, 0),
              color: selectionOnlyTextColor(top.color, leafActive, leafEnabled),
              fontSize: labelFontSize,
            });

            leafCursor += leafSpan;
          });
        } else {
          const labelSpan = midEnd - midStart;
          outerLabels.push({
            key: `label-mid-${midSelectionId}`,
            label: formatLabel(mid.name),
            text: outerLabelPosition(midStart, midEnd, 0),
            color: selectionOnlyTextColor(top.color, midActive, midEnabled),
            fontSize: labelSpan < 10 ? 7.5 : labelSpan < 14 ? 8.2 : 9.0,
          });
        }

        midCursor += midSpan;
      });
    });

    return { topSegments, midSegments, leafSquares, outerLabels };
  }, [selectedTopIds, selectedMidIds, selectedLeafIds, topLayout]);


  const cupWheel = useMemo(() => {
    const topSegments = [];
    const midSegments = [];
    const leafSquares = [];
    const outerLabels = [];

    const hasAnyTopSelected = selectedCupTopIds.length > 0;

    cupProfileData.forEach((top) => {
      const layout = cupTopLayout.find((item) => item.name === top.name);
      const topStart = layout.start;
      const topEnd = layout.end;
      const topSpan = layout.span;

      const topSelectionId = cupTopId(top.name);
      const topActive = selectedCupTopIds.includes(topSelectionId);

      topSegments.push({
        key: topSelectionId,
        lines: hasSlash(top.name) ? splitSlashLabel(top.name) : [formatLabel(top.name)],
        path: arcPath(r0, r1, topStart, topEnd),
        fill: topSelectionFill(top.color, topActive, hasAnyTopSelected),
        text: textPosition(r0, r1, topStart, topEnd, 0.53),
        onClick: () => toggleCupTop(top.name),
        strokeWidth: topActive ? 3 : 2,
        fontSize: topSpan < 26 ? 9.6 : topSpan < 36 ? 10.8 : 11.5,
      });

      const mids = top.children;
      const midWeights = mids.map((mid) => (mid.children?.length ? mid.children.length : 1));
      const midWeightTotal = midWeights.reduce((sum, w) => sum + w, 0);

      let midCursor = topStart;

      mids.forEach((mid, midIndex) => {
        const midSpan = (midWeights[midIndex] / midWeightTotal) * (topEnd - topStart);
        const midStart = midCursor;
        const midEnd = midCursor + midSpan;

        const midSelectionId = cupMidId(top.name, mid.name);
        const midEnabled = selectedCupTopIds.includes(topSelectionId);
        const midActive = selectedCupMidIds.includes(midSelectionId);
        const leaves = mid.children || [];

        midSegments.push({
          key: midSelectionId,
          lines: hasSlash(mid.name) ? splitSlashLabel(mid.name) : [formatLabel(mid.name)],
          path: arcPath(r1, r2, midStart, midEnd),
          fill: selectionOnlyFill(top.color, midActive, midEnabled),
          text: textPosition(r1, r2, midStart, midEnd, 0.51),
          onClick: () => toggleCupMid(top.name, mid.name),
          strokeWidth: midActive ? 3 : 2,
          fontSize: midSpan < 16 ? 8.2 : midSpan < 28 ? 9.1 : 10.3,
        });

        if (leaves.length > 0) {
          const leafSpan = (midEnd - midStart) / leaves.length;
          let leafCursor = midStart;

          leaves.forEach((leaf) => {
            const leafStart = leafCursor;
            const leafEnd = leafCursor + leafSpan;
            const leafSelectionId = cupLeafId(top.name, mid.name, leaf);
            const leafEnabled =
              selectedCupTopIds.includes(topSelectionId) &&
              selectedCupMidIds.includes(midSelectionId);
            const leafActive = selectedCupLeafIds.includes(leafSelectionId);
            const squareCenter = squareCenterPosition(leafStart, leafEnd);

            leafSquares.push({
              key: leafSelectionId,
              x: squareCenter.x,
              y: squareCenter.y,
              angle: squareCenter.angle,
              size: outerSquareSize,
              fill: selectionOnlyFill(top.color, leafActive, leafEnabled),
              strokeWidth: leafActive ? 2.2 : 1.15,
              onClick: () => toggleCupLeaf(top.name, mid.name, leaf),
            });

            let labelFontSize = 9.2;
            if (leafSpan < 6.5) labelFontSize = 6.8;
            else if (leafSpan < 8) labelFontSize = 7.2;
            else if (leafSpan < 10) labelFontSize = 7.8;
            else if (leafSpan < 12) labelFontSize = 8.4;
            else if (leafSpan < 15) labelFontSize = 8.9;

            outerLabels.push({
              key: `label-${leafSelectionId}`,
              label: formatLabel(leaf),
              text: outerLabelPosition(leafStart, leafEnd, 0),
              color: selectionOnlyTextColor(top.color, leafActive, leafEnabled),
              fontSize: labelFontSize,
            });

            leafCursor += leafSpan;
          });
        } else {
          const labelSpan = midEnd - midStart;
          outerLabels.push({
            key: `label-mid-${midSelectionId}`,
            label: formatLabel(mid.name),
            text: outerLabelPosition(midStart, midEnd, 0),
            color: selectionOnlyTextColor(top.color, midActive, midEnabled),
            fontSize: labelSpan < 10 ? 7.5 : labelSpan < 14 ? 8.2 : 9.0,
          });
        }

        midCursor += midSpan;
      });
    });

    return { topSegments, midSegments, leafSquares, outerLabels };
  }, [selectedCupTopIds, selectedCupMidIds, selectedCupLeafIds, cupTopLayout]);

  const currentWheel = wheelMode === "cup" ? cupWheel : wheel;

  function suggestionButtonStyle(isSelected = false) {
    return {
      width: "100%",
      textAlign: "left",
      padding: "8px 10px",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
      background: isSelected ? "#eef2ff" : "#fff",
      cursor: "pointer",
      fontSize: "13px",
      lineHeight: 1.35,
      whiteSpace: "normal",
      overflowWrap: "anywhere",
      wordBreak: "break-word",
    };
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f1eb",
        fontFamily: "Arial, sans-serif",
        padding: isMobile ? "10px" : "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 420px",
          gap: isMobile ? "14px" : "28px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: isMobile ? "10px" : "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <h1
              style={{
                margin: 0,
                fontSize: isMobile ? "22px" : "30px",
                lineHeight: 1.2,
              }}
            >
              Coffee Flavor Wheel
            </h1>
            <p
              style={{
                margin: "8px 0 0",
                color: "#666",
                fontSize: isMobile ? "13px" : "16px",
              }}
            >
              {wheelMode === "cup" ? "Double tap or swipe the center to return to the flavor wheel" : "Double tap or swipe the center to open the cup profile wheel"}
            </p>
          </div>

     <div style={{ width: "100%", overflowX: "auto" }}>
  <svg
    ref={wheelSvgRef}
    viewBox={`${-viewPadding} ${-viewPadding} ${size + viewPadding * 2} ${
      size + viewPadding * 2
    }`}
              style={{
                width: "100%",
                maxWidth: isMobile ? "820px" : "1080px",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            >
              <rect x="0" y="0" width={size} height={size} fill="#f4f1eb" rx="12" />

              {currentWheel.midSegments.map((seg) => (
                <g key={seg.key}>
                  <path
                    d={seg.path}
                    fill={seg.fill}
                    stroke="#f8f5ef"
                    strokeWidth={seg.strokeWidth}
                    onClick={seg.onClick}
                    style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                  />
                  <text
                    x={seg.text.x}
                    y={seg.text.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isMobile ? Math.max(seg.fontSize - 0.3, 7.6) : seg.fontSize}
                    fill="#ffffff"
                    transform={`rotate(${getReadableRotation(seg.text.angle)} ${seg.text.x} ${seg.text.y})`}
                    style={{ pointerEvents: "none", userSelect: "none", fontWeight: 700 }}
                  >
                    {seg.lines.map((line, i) => (
                      <tspan
                        key={`${seg.key}-${i}`}
                        x={seg.text.x}
                        dy={
                          seg.lines.length === 1
                            ? i === 0
                              ? "0em"
                              : "0em"
                            : i === 0
                              ? "-0.38em"
                              : "1.05em"
                        }
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              ))}

              {currentWheel.topSegments.map((seg) => (
                <g key={seg.key}>
                  <path
                    d={seg.path}
                    fill={seg.fill}
                    stroke="#f8f5ef"
                    strokeWidth={seg.strokeWidth}
                    onClick={seg.onClick}
                    style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                  />
                  <text
                    x={seg.text.x}
                    y={seg.text.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isMobile ? Math.max(seg.fontSize - 0.2, 8.8) : seg.fontSize}
                    fill="#ffffff"
                    transform={`rotate(${getReadableRotation(seg.text.angle)} ${seg.text.x} ${seg.text.y})`}
                    style={{ pointerEvents: "none", userSelect: "none", fontWeight: 700 }}
                  >
                    {seg.lines.map((line, i) => (
                      <tspan
                        key={`${seg.key}-${i}`}
                        x={seg.text.x}
                        dy={
                          seg.lines.length === 1
                            ? i === 0
                              ? "0em"
                              : "0em"
                            : i === 0
                              ? "-0.38em"
                              : "1.05em"
                        }
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              ))}

              {currentWheel.leafSquares.map((sq) => (
                <rect
                  key={sq.key}
                  x={sq.x - sq.size / 2}
                  y={sq.y - sq.size / 2}
                  width={sq.size}
                  height={sq.size}
                  fill={sq.fill}
                  stroke="#f8f5ef"
                  strokeWidth={sq.strokeWidth}
                  rx="0"
                  ry="0"
                  transform={`rotate(${sq.angle} ${sq.x} ${sq.y})`}
                  onClick={sq.onClick}
                  style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                />
              ))}

              {currentWheel.outerLabels.map((item) => (
                <text
                  key={item.key}
                  x={item.text.x}
                  y={item.text.y}
                  textAnchor={getOuterLabelAnchor(item.text.angle)}
                  dominantBaseline="middle"
                  fontSize={isMobile ? Math.max(item.fontSize - 0.2, 6.8) : item.fontSize}
                  fill={item.color}
                  transform={`rotate(${getReadableRotation(item.text.angle)} ${item.text.x} ${item.text.y})`}
                  style={{ pointerEvents: "none", userSelect: "none", fontWeight: 700 }}
                >
                  {item.label}
                </text>
              ))}

              <g
                onDoubleClick={toggleWheelMode}
                onClick={handleCenterClick}
                onTouchStart={handleCenterTouchStart}
                onTouchEnd={handleCenterTouchEnd}
                style={{ cursor: "pointer", touchAction: "manipulation" }}
              >
                <circle
                  cx={center}
                  cy={center}
                  r={r0}
                  fill="#f4f1eb"
                  stroke="#f8f5ef"
                  strokeWidth="2"
                />
                <text
                  x={center}
                  y={center - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={wheelMode === "cup" ? 18 : 16}
                  fill="#111827"
                  style={{ userSelect: "none", fontWeight: 700, pointerEvents: "none" }}
                >
                  {wheelMode === "cup" ? "Cup / Coffee" : "Flavor Wheel"}
                </text>
                <text
                  x={center}
                  y={center + 18}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill="#6b7280"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                >
                  double tap / click / swipe
                </text>
              </g>
            </svg>
          </div>
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: isMobile ? "16px" : "20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: isMobile ? "18px" : "20px" }}>Tasting info</h2>

            <div style={{ display: "grid", gap: "10px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={openOriginPicker}
                  style={{
                    padding: isMobile ? "12px 14px" : "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    background: "#fff",
                    textAlign: "left",
                    cursor: "pointer",
                    color: originName ? "#111827" : "#9ca3af",
                    whiteSpace: "normal",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                    lineHeight: 1.4,
                  }}
                >
                  {originName || "Country / Region / Farm"}
                </button>

                <button
                  type="button"
                  onClick={openRoastDayPicker}
                  style={{
                    padding: isMobile ? "12px 14px" : "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    background: "#fff",
                    textAlign: "left",
                    cursor: "pointer",
                    color: roastDay ? "#111827" : "#9ca3af",
                  }}
                >
                  {roastDay || "Roast day"}
                </button>
              </div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "10px",
    alignItems: "start",
  }}
>
  <button
    type="button"
    onClick={openVarietyPicker}
    style={{
      width: "100%",
      minHeight: isMobile ? "46px" : "42px",
      padding: isMobile ? "12px 14px" : "10px 12px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      background: "#fff",
      textAlign: "left",
      cursor: "pointer",
      color: varietyName ? "#111827" : "#9ca3af",
      lineHeight: 1.35,
      boxSizing: "border-box",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      whiteSpace: "normal",
      overflowWrap: "anywhere",
      wordBreak: "break-word",
    }}
  >
    {varietyName || "Variety"}
  </button>

  <div style={{ width: "100%" }}>
    <input
      type="text"
      value={dripperName}
      onChange={(e) => setDripperName(e.target.value)}
      list="dripper-options"
      placeholder="Dripper"
      style={{
        width: "100%",
        minHeight: isMobile ? "46px" : "42px",
        padding: isMobile ? "12px 14px" : "10px 12px",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
        background: "#fff",
        color: "#111827",
        boxSizing: "border-box",
        lineHeight: 1.35,
      }}
    />
    <datalist id="dripper-options">
      {dripperOptions.map((dripper) => (
        <option key={dripper} value={dripper} />
      ))}
    </datalist>
  </div>
</div>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="Memo"
                rows={4}
                style={{
                  padding: isMobile ? "12px 14px" : "10px 12px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <button
                  onClick={saveNote}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#111827",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 700,
                    minHeight: "44px",
                  }}
                >
                  {editingNoteId ? "Update note" : "Save note"}
                </button>

                <button
                  onClick={clearCurrentSelection}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    cursor: "pointer",
                    minHeight: "44px",
                  }}
                >
                  {editingNoteId ? "Cancel edit" : "Clear"}
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: isMobile ? "16px" : "20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: isMobile ? "18px" : "20px" }}>Flavor notes</h2>

            {selectedItemsForPanel.length === 0 ? (
              <p style={{ color: "#666" }}>Nothing selected yet.</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedItemsForPanel.map((item) => (
                  <span
                    key={item.id}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "999px",
                      background: `${item.color}22`,
                      border: `1px solid ${item.color}66`,
                      color: item.color,
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: isMobile ? "16px" : "20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: isMobile ? "18px" : "20px" }}>Cup / coffee summary</h2>

            {selectedCupItemsForPanel.length === 0 ? (
              <p style={{ color: "#666", marginBottom: 0 }}>
                Switch the center wheel and select cup-profile or coffee descriptors to build a quick summary.
              </p>
            ) : (
              <div style={{ display: "grid", gap: "12px" }}>
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "14px",
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    color: "#111827",
                    lineHeight: 1.6,
                    fontSize: "14px",
                  }}
                >
                  {cupQuickSummary}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {selectedCupItemsForPanel.map((item) => (
                    <span
                      key={item.id}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "999px",
                        background: `${item.color}14`,
                        border: `1px solid ${item.color}44`,
                        color: item.color,
                        fontWeight: 700,
                        fontSize: "13px",
                      }}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: isMobile ? "16px" : "20px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: isMobile ? "18px" : "20px" }}>Saved notes</h2>

            {savedNotes.length === 0 ? (
              <p style={{ color: "#666", marginBottom: 0 }}>No saved notes yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "12px" }}>
                {savedNotes.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      background: getDominantColorFromNote(note),
                      border: editingNoteId === note.id ? "2px solid #111827" : "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        alignItems: isMobile ? "flex-start" : "center",
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            whiteSpace: "normal",
                            overflowWrap: "anywhere",
                            wordBreak: "break-word",
                            lineHeight: 1.4,
                          }}
                        >
                          {note.beanName}
                        </div>
                        {note.varietyName || note.dripperName ? (
  <div
    style={{
      fontSize: "12px",
      color: "#444",
      marginTop: "2px",
      whiteSpace: "normal",
      overflowWrap: "anywhere",
      wordBreak: "break-word",
      lineHeight: 1.4,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }}
  >
    {note.varietyName ? `Variety: ${note.varietyName}` : ""}
    {note.varietyName && note.dripperName ? " · " : ""}
    {note.dripperName ? `Dripper: ${note.dripperName}` : ""}
  </div>
) : null}
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {note.roastDay ? `Roast day: ${note.roastDay} · ` : ""}
                          {note.createdAt}
                          {note.updatedAt ? ` · Updated: ${note.updatedAt}` : ""}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={() => editSavedNote(note)}
                          style={{
                            border: "1px solid #d1d5db",
                            background: "#fff",
                            borderRadius: "8px",
                            cursor: "pointer",
                            minHeight: "38px",
                            padding: "0 12px",
                          }}
                        >
                          Edit
                        </button>

                        <button
  onClick={() => handleNotePdf(note)}
  style={{
    border: "1px solid #d1d5db",
    background: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    minHeight: "38px",
    padding: "0 12px",
  }}
>
  PDF
</button>

                        <button
                          onClick={() => deleteSavedNote(note.id)}
                          style={{
                            border: "1px solid #e5e7eb",
                            background: "#fff",
                            borderRadius: "8px",
                            cursor: "pointer",
                            minHeight: "38px",
                            padding: "0 12px",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {note.memo ? (
                      <div style={{ marginTop: "8px", fontSize: "14px", color: "#444" }}>
                        {note.memo}
                      </div>
                    ) : null}

                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {note.items.map((item) => (
                        <span
                          key={`${note.id}-${item.id}`}
                          style={{
                            padding: "6px 10px",
                            borderRadius: "999px",
                            background: "#f3f4f6",
                            fontSize: "12px",
                            minWidth: 0,
                            maxWidth: "100%",
                            whiteSpace: "normal",
                            overflowWrap: "anywhere",
                            wordBreak: "break-word",
                            lineHeight: 1.4,
                          }}
                        >
                          {formatLabel(item.name)}
                        </span>
                      ))}
                    </div>

                    {note.cupItems && note.cupItems.filter((item) => item.level !== "top").length > 0 ? (
                      <div
                        style={{
                          marginTop: "8px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        {note.cupItems
                          .filter((item) => item.level !== "top")
                          .map((item) => (
                            <span
                              key={`${note.id}-cup-${item.id}`}
                              style={{
                                padding: "6px 10px",
                                borderRadius: "999px",
                                background: "#11182714",
                                border: "1px solid #11182722",
                                color: "#111827",
                                fontSize: "12px",
                                minWidth: 0,
                                maxWidth: "100%",
                                whiteSpace: "normal",
                                overflowWrap: "anywhere",
                                wordBreak: "break-word",
                                lineHeight: 1.4,
                              }}
                            >
                              {formatLabel(item.name)}
                            </span>
                          ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


      {isVarietyPickerOpen && (
        <div
          onClick={() => setIsVarietyPickerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(17, 24, 39, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: 1050,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "760px",
              background: "#fff",
              borderRadius: "24px",
              padding: isMobile ? "16px" : "20px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
              Select variety
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "12px",
                lineHeight: 1.5,
              }}
            >
              Search varieties from the uploaded World Coffee Research catalog.
            </div>

            <input
              autoFocus
              value={varietySearchInput}
              onChange={(e) => setVarietySearchInput(e.target.value)}
              placeholder="Type variety name"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            />

            <div
              style={{
                display: "grid",
                gap: "6px",
                maxHeight: "420px",
                overflowY: "auto",
              }}
            >
              {varietySuggestions.map((variety) => (
                <button
                  key={variety}
                  type="button"
                  onClick={() => setVarietySearchInput(variety)}
                  style={suggestionButtonStyle(
                    normalizeVarietyKey(varietySearchInput) === normalizeVarietyKey(variety)
                  )}
                >
                  {variety}
                </button>
              ))}
            </div>

            <div
              style={{
                marginTop: "14px",
                padding: "12px",
                borderRadius: "12px",
                background: "#f9fafb",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "16px",
                color: normalizeText(varietySearchInput) ? "#111827" : "#9ca3af",
                whiteSpace: "normal",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                lineHeight: 1.45,
              }}
            >
              {normalizeText(varietySearchInput) || "Variety"}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "16px",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setVarietyName("");
                  setVarietySearchInput("");
                  setIsVarietyPickerOpen(false);
                }}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => setIsVarietyPickerOpen(false)}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmVarietySelection}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#111827",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                  minHeight: "44px",
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {isOriginPickerOpen && (
        <div
          onClick={() => setIsOriginPickerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(17, 24, 39, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "960px",
              background: "#fff",
              borderRadius: "24px",
              padding: isMobile ? "16px" : "20px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
              Select origin / region / farm
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "12px",
                lineHeight: 1.5,
              }}
            >
              Type to search existing options. If nothing matches, you can add your own.
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                gap: "12px",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "12px",
                  background: "#f9fafb",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "8px" }}>Country</div>

                <input
                  autoFocus
                  value={newCountryInput}
                  onChange={(e) => setNewCountryInput(e.target.value)}
                  placeholder="Type country"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                />

                <button
                  type="button"
                  onClick={handleAddCountry}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#111827",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  Add country
                </button>

                <div
                  style={{
                    display: "grid",
                    gap: "6px",
                    maxHeight: "220px",
                    overflowY: "auto",
                  }}
                >
                  {countrySuggestions.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        setTempCountry(country);
                        setTempRegion("");
                        setTempFarm("");
                        setNewCountryInput(country);
                        setNewRegionInput("");
                        setNewFarmInput("");
                      }}
                      style={suggestionButtonStyle(
                        tempCountry.toLowerCase() === country.toLowerCase()
                      )}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "12px",
                  background: "#f9fafb",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "8px" }}>Region</div>

                <input
                  value={newRegionInput}
                  onChange={(e) => setNewRegionInput(e.target.value)}
                  placeholder={tempCountry ? "Type region" : "Select country first"}
                  disabled={!tempCountry}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    marginBottom: "8px",
                    opacity: tempCountry ? 1 : 0.6,
                  }}
                />

                <button
                  type="button"
                  onClick={handleAddRegion}
                  disabled={!tempCountry}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "none",
                    background: tempCountry ? "#111827" : "#9ca3af",
                    color: "#fff",
                    cursor: tempCountry ? "pointer" : "not-allowed",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  Add region
                </button>

                <div
                  style={{
                    display: "grid",
                    gap: "6px",
                    maxHeight: "220px",
                    overflowY: "auto",
                  }}
                >
                  {regionSuggestions.map((region) => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => {
                        setTempRegion(region);
                        setTempFarm("");
                        setNewRegionInput(region);
                        setNewFarmInput("");
                      }}
                      style={suggestionButtonStyle(
                        tempRegion.toLowerCase() === region.toLowerCase()
                      )}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "12px",
                  background: "#f9fafb",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "8px" }}>Farm</div>

                <input
                  value={newFarmInput}
                  onChange={(e) => setNewFarmInput(e.target.value)}
                  placeholder={tempCountry && tempRegion ? "Type farm" : "Select country and region first"}
                  disabled={!tempCountry || !tempRegion}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "14px",
                    marginBottom: "8px",
                    opacity: tempCountry && tempRegion ? 1 : 0.6,
                  }}
                />

                <button
                  type="button"
                  onClick={handleAddFarm}
                  disabled={!tempCountry || !tempRegion}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "none",
                    background: tempCountry && tempRegion ? "#111827" : "#9ca3af",
                    color: "#fff",
                    cursor: tempCountry && tempRegion ? "pointer" : "not-allowed",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  Add farm
                </button>

                <div
                  style={{
                    display: "grid",
                    gap: "6px",
                    maxHeight: "220px",
                    overflowY: "auto",
                  }}
                >
                  {farmSuggestions.map((farm) => (
                    <button
                      key={farm}
                      type="button"
                      onClick={() => {
                        setTempFarm(farm);
                        setNewFarmInput(farm);
                      }}
                      style={suggestionButtonStyle(
                        tempFarm.toLowerCase() === farm.toLowerCase()
                      )}
                    >
                      {farm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "14px",
                padding: "12px",
                borderRadius: "12px",
                background: "#f9fafb",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "16px",
                color: buildOriginLabel(tempCountry, tempRegion, tempFarm) ? "#111827" : "#9ca3af",
                whiteSpace: "normal",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                lineHeight: 1.45,
              }}
            >
              {buildOriginLabel(tempCountry, tempRegion, tempFarm) || "Country / Region / Farm"}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "14px",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setTempCountry("");
                  setTempRegion("");
                  setTempFarm("");
                  setNewCountryInput("");
                  setNewRegionInput("");
                  setNewFarmInput("");
                  setOriginName("");
                  setIsOriginPickerOpen(false);
                }}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Clear
              </button>

              <button
                type="button"
                onClick={confirmOriginSelection}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#111827",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                  minHeight: "44px",
                }}
              >
                Done
              </button>
            </div>

            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "#6b7280",
                lineHeight: 1.6,
              }}
            >
              Existing options are shown as suggestions. If a farm is not in the list, users can add
              it and it will be saved in this browser.
            </div>
          </div>
        </div>
      )}

      {isDatePickerOpen && (
        <div
          onClick={() => setIsDatePickerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(17, 24, 39, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            zIndex: 1100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "560px",
              background: "#fff",
              borderRadius: "24px",
              padding: isMobile ? "16px" : "20px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "14px" }}>
              Select roast day
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Day</div>
                <select
                  value={pickerDay}
                  onChange={(e) => setPickerDay(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    fontSize: "16px",
                    background: "#fff",
                  }}
                >
                  {dayOptions.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Month</div>
                <select
                  value={pickerMonth}
                  onChange={(e) => setPickerMonth(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    fontSize: "16px",
                    background: "#fff",
                  }}
                >
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Year</div>
                <select
                  value={pickerYear}
                  onChange={(e) => setPickerYear(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    fontSize: "16px",
                    background: "#fff",
                  }}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                borderRadius: "12px",
                background: "#f9fafb",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              {pickerDay}/{pickerMonth}/{pickerYear}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "16px",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  const today = getTodayParts();
                  setPickerDay(today.day);
                  setPickerMonth(today.month);
                  setPickerYear(today.year);
                }}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Today
              </button>

              <button
                type="button"
                onClick={() => setIsDatePickerOpen(false)}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmRoastDay}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#111827",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                  minHeight: "44px",
                }}
              >
                Done
              </button>
            </div>

            <Analytics />
            
          </div>
        </div>
      )}
    </div>
  );
}

export default App;