"use client";

import { useState } from "react";
import Image from "next/image";
import ContactForm from "@/app/(components)/helpers/ContactForm";
import {
  FaGasPump,
  FaCar,
  FaTachometerAlt,
  FaChair,
  FaShieldAlt,
  FaMusic,
  FaKey,
  FaSnowflake,
  FaSun,
  FaWifi,
  FaParking,
  FaCarSide,
  FaCarCrash,
  FaTire,
  FaFan,
  FaLightbulb,
  FaVolumeUp,
} from "react-icons/fa";
import {
  GiGearStick,
  GiCarDoor,
  GiSteeringWheel,
  GiCarWheel,
} from "react-icons/gi";
import {
  MdAir,
  MdDirectionsCar,
  MdOutlineSecurity,
  MdOutlineredtooth,
  MdOutlineElectricCar,
} from "react-icons/md";
import { IoMdColorPalette } from "react-icons/io";
import { RiSteering2Line, RiTempColdLine } from "react-icons/ri";
import {
  BsSpeedometer2,
  BsSnow,
  BsLightningCharge,
  BsCheck2,
} from "react-icons/bs";
import ImageSlider from "./ImageSlider";
import FinanceCalculatorAdvanced from "@/app/(components)/helpers/FinanceCalculatorAdvanced";
import GridBackground from "@/app/(components)/helpers/Grid";
const prettifyValue = (category, value) => {
  const maps = {
    climatisation: {
      AUTOMATIC_CLIMATISATION: "Automatisch",
      AUTOMATIC_CLIMATISATION_2_ZONES: "2-Zonen-Klimaautomatik",
      AUTOMATIC_CLIMATISATION_3_ZONES: "3-Zonen-Klimaautomatik",
      MANUAL_CLIMATISATION: "Manuell",
    },
    fuel: {
      DIESEL: "Diesel",
      PETROL: "Benzin",
      ELECTRIC: "Elektrisch",
      HYBRID: "Hybrid",
      LPG: "Autogas (LPG)",
      CNG: "Erdgas (CNG)",
      HYDROGEN: "Wasserstoff",
      OTHER: "Andere",
    },
    category: {
      CAR: "PKW",
      OffRoad: "SUV / Geländewagen",
      VAN: "Van / Kleinbus",
      CONVERTIBLE: "Cabrio",
      COUPE: "Coupé",
      WAGON: "Kombi",
      Limousine: "Limousine",
      SmallCar: "Kleinwagen",
      SPORTS_CAR: "Sportwagen",
      PICKUP: "Pickup",
      OTHER: "Andere",
    },
    color: {
      BLACK: "Schwarz",
      WHITE: "Weiß",
      SILVER: "Silber",
      GREY: "Grau",
      RED: "Rot",
      BLUE: "Blau",
      GREEN: "Grün",
      YELLOW: "Gelb",
      BROWN: "Braun",
      ORANGE: "Orange",
      PURPLE: "Lila",
      BEIGE: "Beige",
      GOLD: "Gold",
      PINK: "Rosa",
      MULTICOLOUR: "Mehrfarbig",
      OTHER: "Andere",
    },
    airbag: {
      FRONT_AIRBAGS: "Front",
      SIDE_AIRBAGS: "Seiten",
      FRONT_AND_SIDE_AIRBAGS: "Front & Seite",
      FRONT_AND_SIDE_AND_MORE_AIRBAGS: "Vollausstattung (Front & Seite)",
    },
    bendingLightsType: {
      ADAPTIVE_BENDING_LIGHTS: "Adaptives Kurvenlicht",
      STATIC_BENDING_LIGHTS: "Statisches Kurvenlicht",
    },
    parkingAssistants: {
      FRONT_SENSORS: "Frontsensoren",
      REAR_SENSORS: "Hecksensoren",
      CAM_360_DEGREES: "360° Kamera",
      REAR_CAMERA: "Rückfahrkamera",
      PARKING_ASSISTANT: "Parkassistent",
    },
    doors: {
      TWO: "2 Türen",
      THREE: "3 Türen",
      FOUR: "4 Türen",
      FIVE: "5 Türen",
      FOUR_OR_FIVE: "4/5 Türen",
      TWO_OR_THREE: "2/3 Türen",
      "four or five": "45 Türen", // in case it's lowercase text from API
    },
    gearbox: {
      MANUAL_GEAR: "Schaltgetriebe",
      AUTOMATIC_GEAR: "Automatik",
      SEMI_AUTOMATIC_GEAR: "Halbautomatik",
      NO_GEARS: "Ohne Getriebe",
    },
    driveType: {
      FRONT: "Vorderradantrieb",
      REAR: "Hinterradantrieb",
      ALL_WHEEL: "Allradantrieb",
      FOUR_WHEEL: "Vierradantrieb",
    },
  };

  if (Array.isArray(value)) {
    return value
      .map((v) => maps[category]?.[v] || v.replace(/_/g, " ").toLowerCase())
      .join(", ");
  }

  return (
    maps[category]?.[value] ||
    value
      ?.replace(/_/g, " ")
      .toLowerCase()
      ?.replace(/^\w/, (c) => c.toUpperCase()) ||
    "-"
  );
};
function renderDescription(description) {
  if (!description) return null;

  // Replace weird characters with space or breaks
  const cleaned = description
    .replace(/∗/g, "\n") // ∗ as separator
    .replace(/([a-z])([A-Z])/g, "$1\n$2") // Split camel-cased like "LeichtmetallfelgenTuner" into two
    .replace(/(?<=[a-z])([A-Z])/g, "\n$1") // also catches missing space after lowercase
    .replace(/(WIR BIETEN.*?AN:)/i, "\n$1\n") // separate the service section
    .replace(/(?<=[a-z])([A-Z])/g, "\n$1") // just in case
    .replace(/(Mail\s*:|WhatsApp\s*:)/gi, "\n$1") // break contact info
    .replace(/\s{2,}/g, " ") // remove excess spacing
    .trim();

  const lines = cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line, index) => {
    // Show contact or header sections as strong
    if (
      /^Mail\s*:|^WhatsApp\s*:|^WIR BIETEN|^Finanzierung|^Inzahlungnahme|^Zulassungsservice|^Auslieferungsservice/i.test(
        line
      )
    ) {
      return (
        <h4
          key={index}
          className="mt-4 mb-1 font-bold text-xs sm:text-sm md:text-base text-gray-800 break-words whitespace-pre-line"
        >
          {line}
        </h4>
      );
    }

    // Bold if label-like (e.g., Klimatisierung: Klimaautomatik)
    if (/^[\wäöüÄÖÜß\s]+:/.test(line)) {
      const [label, ...rest] = line.split(":");
      return (
        <p
          key={index}
          className="mb-2 text-xs sm:text-sm md:text-base text-gray-700 break-words whitespace-pre-line"
        >
          <strong className="font-semibold">{label.trim()}:</strong>{" "}
          {rest.join(":").trim()}
        </p>
      );
    }

    // Short line = feature → bullet
    if (line.length <= 40) {
      return (
        <li
          key={index}
          className="ml-4 list-disc text-xs sm:text-sm md:text-base text-gray-700 break-words whitespace-pre-line"
        >
          {line}
        </li>
      );
    }

    // Regular paragraph
    return (
      <p key={index} className="mb-2 text-sm md:text-base text-gray-700">
        {line}
      </p>
    );
  });
}

const SpecCard = ({ icon, title, items }) => {
  // Filter out items where value is "Nein"
  const visibleItems = items.filter(
    (item) =>
      item.value !== "Nein" && item.value !== undefined && item.value !== null
  );

  // If nothing to show, skip rendering
  if (visibleItems.length === 0) return null;

  return (
    <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3 md:mb-4">
        <div className="bg-red-50 p-2 md:p-3 rounded-lg mr-2 md:mr-3 text-red-600">
          {icon}
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-800">
          {title}
        </h3>
      </div>
      <div className="space-y-2 md:space-y-3">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-1 md:py-1.5 border-b border-gray-100 last:border-0"
          >
            <span className="text-xs md:text-sm text-gray-600">
              {item.label}
            </span>
            <span
              className={`font-medium text-gray-800 ${
                ["Klimaanlage", "Airbags", "Parkassistent"].includes(item.label)
                  ? "text-xs"
                  : "text-sm"
              }`}
            >
              {item.value === "Ja" ? (
                <BsCheck2 className="text-green-600 text-2xl" />
              ) : (
                item.value || "-"
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

function CarDetailContent({ car }) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeTab, setActiveTab] = useState("übersicht");

  const formatPrice = (priceObj) =>
    `${priceObj.consumerPriceGross.toLocaleString("de-DE")} €`;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    return `${month}/${year}`;
  };

  const ausstattungCategories = [
    {
      title: "Komfort",
      icon: <MdAir className="text-red-600" />,
      features: [
        {
          label: "Klimaanlage",
          value: prettifyValue("climatisation", car.climatisation),
        },
        {
          label: "Regensensor",
          value: car.automaticRainSensor ? "Ja" : "Nein",
        },
        { label: "Keyless Entry", value: car.keylessEntry ? "Ja" : "Nein" },
        {
          label: "Elektrische Fensterheber",
          value: car.electricWindows ? "Ja" : "Nein",
        },
        {
          label: "Elektrische Heckklappe",
          value: car.electricTailgate ? "Ja" : "Nein",
        },
        {
          label: "Elektrische Außenspiegel",
          value: car.electricExteriorMirrors ? "Ja" : "Nein",
        },
        {
          label: "Anklappbare Spiegel",
          value: car.foldingExteriorMirrors ? "Ja" : "Nein",
        },
        {
          label: "Beheizbare Frontscheibe",
          value: car.heatedWindshield ? "Ja" : "Nein",
        },
        {
          label: "Zentralverriegelung",
          value: car.centralLocking ? "Ja" : "Nein",
        },
        {
          label: "Multifunktionslenkrad",
          value: car.multifunctionalWheel ? "Ja" : "Nein",
        },
      ],
    },
    {
      title: "Unterhaltung",
      icon: <FaMusic className="text-red-600" />,
      features: [
        {
          label: "Navigationssystem",
          value: car.navigationSystem ? "Ja" : "Nein",
        },
        { label: "redtooth", value: car.redtooth ? "Ja" : "Nein" },
        { label: "Touchscreen", value: car.touchscreen ? "Ja" : "Nein" },
        { label: "Sprachsteuerung", value: car.voiceControl ? "Ja" : "Nein" },
        {
          label: "Wireless Charging",
          value: car.wirelessCharging ? "Ja" : "Nein",
        },
        { label: "USB", value: car.usb ? "Ja" : "Nein" },
        { label: "CD-Player", value: car.cdPlayer ? "Ja" : "Nein" },
        {
          label: "Freisprecheinrichtung",
          value: car.handsFreePhoneSystem ? "Ja" : "Nein",
        },
        { label: "Radio", value: car.radio?.join(", ") || "-" },
        { label: "Bordcomputer", value: car.onBoardComputer ? "Ja" : "Nein" },
      ],
    },
    {
      title: "Sitzausstattung",
      icon: <FaChair className="text-red-600" />,
      features: [
        { label: "Ledersitze", value: car.leatherSeats ? "Ja" : "Nein" },
        { label: "Sportsitze", value: car.sportSeats ? "Ja" : "Nein" },
        {
          label: "Elektrische Sitzverstellung",
          value: car.electricAdjustableSeats ? "Ja" : "Nein",
        },
        {
          label: "Sitzheizung",
          value: car.electricHeatedSeats ? "Ja" : "Nein",
        },
        { label: "Sitzkühlung", value: car.seatCooling ? "Ja" : "Nein" },
        { label: "Sitzmemory", value: car.memorySeats ? "Ja" : "Nein" },
        { label: "Armlehne", value: car.armRest ? "Ja" : "Nein" },
        { label: "Massagefunktion", value: car.seatMassage ? "Ja" : "Nein" },
      ],
    },
  ];

  const featuresCategories = [
    {
      title: "Sicherheit",
      icon: <FaShieldAlt className="text-red-600" />,
      features: [
        { label: "Airbags", value: prettifyValue("airbag", car.airbag) },
        { label: "ABS", value: car.abs ? "Ja" : "Nein" },
        { label: "ESP", value: car.esp ? "Ja" : "Nein" },
        {
          label: "Spurhalteassistent",
          value: car.laneDepartureWarning ? "Ja" : "Nein",
        },
        {
          label: "Reifendruckkontrolle",
          value: car.tirePressureMonitoring ? "Ja" : "Nein",
        },
        {
          label: "Kollisionswarnung",
          value: car.collisionAvoidance ? "Ja" : "Nein",
        },
        { label: "Alarmanlage", value: car.alarmSystem ? "Ja" : "Nein" },
        { label: "Wegfahrsperre", value: car.immobilizer ? "Ja" : "Nein" },
        { label: "Isofix", value: car.isofix ? "Ja" : "Nein" },
        {
          label: "Notrufsystem",
          value: car.emergencyCallSystem ? "Ja" : "Nein",
        },
      ],
    },
    {
      title: "Licht",
      icon: <FaLightbulb className="text-red-600" />,
      features: [
        {
          label: "Scheinwerferwaschanlage",
          value: car.headlightWasherSystem ? "Ja" : "Nein",
        },
        {
          label: "Nebelscheinwerfer",
          value: car.frontFogLights ? "Ja" : "Nein",
        },
        { label: "Lichtsensor", value: car.lightSensor ? "Ja" : "Nein" },
        {
          label: "Fernlichtassistent",
          value: car.highBeamAssist ? "Ja" : "Nein",
        },
        {
          label: "Blendfreies Fernlicht",
          value: car.glareFreeHighBeam ? "Ja" : "Nein",
        },

        {
          label: "Kurvenlicht",
          value: prettifyValue("bendingLightsType", car.bendingLightsType),
        },
        ,
      ],
    },
    {
      title: "Parken",
      icon: <FaParking className="text-red-600" />,
      features: [
        {
          label: "Parkassistent",
          value: prettifyValue("parkingAssistants", car.parkingAssistants),
        },
        {
          label: "360° Kamera",
          value: car.parkingAssistants?.includes("CAM_360_DEGREES")
            ? "Ja"
            : "Nein",
        },
        {
          label: "Frontsensoren",
          value: car.parkingAssistants?.includes("FRONT_SENSORS")
            ? "Ja"
            : "Nein",
        },
        {
          label: "Heckensensoren",
          value: car.parkingAssistants?.includes("REAR_SENSORS")
            ? "Ja"
            : "Nein",
        },
        { label: "Einparkhilfe", value: car.parkingAssist ? "Ja" : "Nein" },
      ],
    },
  ];

  const highlightSpecs = [
    {
      icon: <FaTachometerAlt className="text-white" size={16} />,
      label: "Kilometerstand",
      value: `${car.mileage?.toLocaleString("de-DE")} km`,
    },
    {
      icon: <FaCar className="text-white" size={16} />,
      label: "Erstzulassung",
      value: formatDate(car.firstRegistration),
    },
    {
      icon: <FaGasPump className="text-white" size={16} />,
      label: "Kraftstoff",
      value: prettifyValue("fuel", car.fuel),
    },
    {
      icon: <GiGearStick className="text-white" size={16} />,
      label: "Getriebe",
      value: prettifyValue("gearbox", car.gearbox),
    },
    {
      icon: <GiCarDoor className="text-white" size={16} />,
      label: "Türen",
      value: prettifyValue("doors", car.doors),
    },
    {
      icon: <FaChair className="text-white" size={16} />,
      label: "Sitze",
      value: car.seats,
    },
  ];

  return (
    <>
      <div className="relative z-0">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom right, black 0%, #0a0a0a 40%, #1a0000 60%, #330000 85%, #440000 90%, #550000 100%)",
          }}
        />
        <GridBackground />
        <main className="relative z-10">
          {/* Hero Section */}
          <div className="relative text-white pt-20 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 lg:px-14 overflow-hidden">
            <div className="w-full max-w-[95vw] xl:max-w-[1300px] 2xl:max-w-[1750px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gradient-to-br from-red-600 to-black text-xs px-2 py-1 rounded">
                      {car.condition}
                    </span>
                    <span className="text-red-300 text-xs md:text-sm">
                      {car.category}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                    {car.make} {car.model}
                  </h1>
                  <p className="text-sm md:text-xl text-gray-300 mb-4 md:mb-6">
                    {car.modelDescription}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                    {highlightSpecs.map((spec, index) => (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:px-4 md:py-3 flex items-center gap-2 md:gap-3 hover:bg-white/20 transition-colors"
                      >
                        <div className="bg-gradient-to-br from-red-600 to-black p-1 md:p-2 rounded-lg">
                          {spec.icon}
                        </div>
                        <div>
                          <div className="text-xs text-gray-300">
                            {spec.label}
                          </div>
                          <div className="text-xs sm:text-sm md:text-base font-medium break-words leading-tight">
                            {(spec.value || "-")
                              .toString()
                              .replace(/_/g, " ")
                              .toLowerCase()
                              .replace(/^\w/, (c) => c.toUpperCase())}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6  md:min-w-[250px] mt-4 md:mt-0 border border-white/20">
                  <div className="text-sm md:text-xl text-gray-300 mb-1">
                    Preis
                  </div>
                  <div className="text-xl md:text-3xl font-bold mb-2 md:mb-3">
                    {formatPrice(car.price)}
                  </div>

                  <div className="text-xs text-gray-300 mt-1 md:mt-2 text-center">
                    Inkl. MwSt. • Keine versteckten Kosten
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full max-w-[95vw] xl:max-w-[1300px] 2xl:max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 -mt-8 md:-mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                {/* Image Gallery */}
                <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden">
                  {car.images?.length > 0 ? (
                    <ImageSlider
                      images={car.images.map((img) => img.ref)}
                      car={{ make: car.make, model: car.model }}
                    />
                  ) : (
                    <div className="bg-gray-100 rounded-lg md:rounded-xl aspect-video flex items-center justify-center text-gray-400">
                      Keine Bilder verfügbar
                    </div>
                  )}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden">
                  <div className="border-b border-gray-200 overflow-hidden">
                    <nav className="flex -mb-px min-w-full overflow-x-auto scrollbar-hide">
                      <button
                        onClick={() => setActiveTab("übersicht")}
                        className={`py-3 md:py-4 px-4 md:px-6 text-center border-b-2 font-medium text-xs md:text-sm ${
                          activeTab === "übersicht"
                            ? "border-red-600 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Übersicht
                      </button>
                      <button
                        onClick={() => setActiveTab("ausstattung")}
                        className={`py-3 md:py-4 px-4 md:px-6 text-center border-b-2 font-medium text-xs md:text-sm ${
                          activeTab === "ausstattung"
                            ? "border-red-600 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Ausstattung
                      </button>
                      <button
                        onClick={() => setActiveTab("features")}
                        className={`py-3 md:py-4 px-4 md:px-6 text-center border-b-2 font-medium text-xs md:text-sm ${
                          activeTab === "features"
                            ? "border-red-600 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Features
                      </button>
                      <button
                        onClick={() => setActiveTab("technik")}
                        className={`py-3 md:py-4 px-4 md:px-6 text-center border-b-2 font-medium text-xs md:text-sm ${
                          activeTab === "technik"
                            ? "border-red-600 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Technische Daten
                      </button>
                      {car.description && (
                        <button
                          onClick={() => setActiveTab("beschreibung")}
                          className={`py-3 md:py-4 px-4 md:px-6 text-center border-b-2 font-medium text-xs md:text-sm ${
                            activeTab === "beschreibung"
                              ? "border-red-600 text-red-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          Beschreibung
                        </button>
                      )}
                    </nav>
                  </div>
                  <div className="p-4 md:p-6">
                    {activeTab === "übersicht" && (
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
                          Fahrzeugübersicht
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <SpecCard
                            icon={<FaCar className="text-red-600" size={20} />}
                            title="Allgemeine Daten"
                            items={[
                              { label: "VIN", value: car.vin },
                              {
                                label: "Fahrzeugklasse",
                                value: prettifyValue("category", car.category),
                              },
                              { label: "Zustand", value: car.condition },
                              {
                                label: "Schadstoffklasse",
                                value: car.emissionClass,
                              },
                              {
                                label: "Erstzulassung",
                                value: formatDate(car.firstRegistration),
                              },
                              {
                                label: "TÜV / HU",
                                value:
                                  typeof car.newHuAu === "string"
                                    ? car.newHuAu.toLowerCase().includes("neu")
                                      ? "TÜV neu"
                                      : `TÜV bis ${car.newHuAu}`
                                    : "-",
                              },
                              ...(car.summerTires
                                ? [{ label: "Sommerreifen", value: "Ja" }]
                                : []),
                              ...(car.winterTires
                                ? [{ label: "Winterreifen", value: "Ja" }]
                                : []),
                              ...(car.fullServiceHistory
                                ? [
                                    {
                                      label: "Scheckheft gepflegt",
                                      value: "Ja",
                                    },
                                  ]
                                : []),
                            ]}
                          />

                          <SpecCard
                            icon={
                              <BsSpeedometer2
                                className="text-red-600"
                                size={20}
                              />
                            }
                            title="Technische Daten"
                            items={[
                              { label: "Leistung", value: `${car.power}KW` },
                              {
                                label: "Hubraum",
                                value: car.cubicCapacity
                                  ? `${(
                                      car.cubicCapacity / 1000
                                    ).toLocaleString("de-DE", {
                                      minimumFractionDigits: 3,
                                      maximumFractionDigits: 3,
                                    })} cm³`
                                  : "-",
                              },
                              {
                                label: "Kraftstoff",
                                value: prettifyValue("fuel", car.fuel),
                              },
                              {
                                label: "Getriebe",
                                value: prettifyValue("gearbox", car.gearbox),
                              },
                              {
                                label: "Antriebsart",
                                value: prettifyValue(
                                  "driveType",
                                  car.driveType
                                ),
                              },
                              ...(car.hasAllSeasonTires
                                ? [{ label: "Ganzjahresreifen", value: "Ja" }]
                                : []),
                            ]}
                          />
                          <SpecCard
                            icon={
                              <IoMdColorPalette
                                className="text-red-600"
                                size={20}
                              />
                            }
                            title="Außen"
                            items={[
                              {
                                label: "Farbe",
                                value: prettifyValue(
                                  "color",
                                  car.exteriorColor
                                ),
                              },
                              {
                                label: "Herstellerfarbe",
                                value: car.manufacturerColorName,
                              },
                              {
                                label: "Metallic",
                                value: car.metallic ? "Ja" : "Nein",
                              },
                              {
                                label: "Alufelgen",
                                value: car.alloyWheels ? "Ja" : "Nein",
                              },
                              {
                                label: "Sommerreifen",
                                value: car.summerTires ? "Ja" : "Nein",
                              },
                            ]}
                          />
                          <SpecCard
                            icon={
                              <FaChair className="text-red-600" size={20} />
                            }
                            title="Innen"
                            items={[
                              {
                                label: "Innenausstattung",
                                value: car.interiorType,
                              },
                              {
                                label: "Innenfarbe",
                                value: prettifyValue(
                                  "color",
                                  car.exteriorColor
                                ),
                              },
                              {
                                label: "Sportsitze",
                                value: car.sportSeats ? "Ja" : "Nein",
                              },
                              {
                                label: "Sportpaket",
                                value: car.sportPackage ? "Ja" : "Nein",
                              },
                              {
                                label: "Ambiente-Beleuchtung",
                                value: car.ambientLighting ? "Ja" : "Nein",
                              },
                            ]}
                          />
                        </div>
                      </div>
                    )}
                    {activeTab === "ausstattung" && (
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
                          Ausstattung
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          {ausstattungCategories.map((cat, idx) => (
                            <SpecCard
                              key={idx}
                              icon={cat.icon}
                              title={cat.title}
                              items={cat.features}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {activeTab === "features" && (
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
                          Features & Sicherheit
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          {featuresCategories.map((cat, idx) => (
                            <SpecCard
                              key={idx}
                              icon={cat.icon}
                              title={cat.title}
                              items={cat.features}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {activeTab === "technik" && (
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
                          Technische Daten
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <SpecCard
                            icon={
                              <GiSteeringWheel
                                className="text-red-600"
                                size={20}
                              />
                            }
                            title="Motor & Antrieb"
                            items={[
                              { label: "Leistung", value: `${car.power}KW` },
                              {
                                label: "Hubraum",
                                value: car.cubicCapacity
                                  ? `${(
                                      car.cubicCapacity / 1000
                                    ).toLocaleString("de-DE", {
                                      minimumFractionDigits: 3,
                                      maximumFractionDigits: 3,
                                    })} cm³`
                                  : "-",
                              },
                              {
                                label: "Kraftstoff",
                                value: prettifyValue("fuel", car.fuel),
                              },
                              {
                                label: "Getriebe",
                                value: prettifyValue("gearbox", car.gearbox),
                              },
                              {
                                label: "Antriebsart",
                                value: prettifyValue(
                                  "driveType",
                                  car.driveType
                                ),
                              },
                              {
                                label: "Start-Stopp-Automatik",
                                value: car.startStopSystem ? "Ja" : "Nein",
                              },
                              {
                                label: "Traction Control",
                                value: car.tractionControlSystem
                                  ? "Ja"
                                  : "Nein",
                              },
                              {
                                label: "Schaltwippen",
                                value: car.paddleShifters ? "Ja" : "Nein",
                              },
                            ]}
                          />
                          <SpecCard
                            icon={
                              <RiTempColdLine
                                className="text-red-600"
                                size={20}
                              />
                            }
                            title="Verbrauch & Emissionen"
                            items={[
                              {
                                label: "Kombinierter Verbrauch",
                                value: car.consumptions?.fuel?.combined
                                  ? `${car.consumptions.fuel.combined} L/100km`
                                  : "-",
                              },
                              {
                                label: "CO2-Emissionen",
                                value: car.emissions?.combined?.co2
                                  ? `${car.emissions.combined.co2} g/km`
                                  : "-",
                              },
                              {
                                label: "Schadstoffklasse",
                                value: car.emissionClass,
                              },
                              {
                                label: "E10-tauglich",
                                value: car.e10Enabled ? "Ja" : "Nein",
                              },
                            ]}
                          />
                          <SpecCard
                            icon={
                              <GiCarWheel className="text-red-600" size={20} />
                            }
                            title="Abmessungen"
                            items={[
                              {
                                label: "Türen",
                                value: prettifyValue("doors", car.doors),
                              },
                              { label: "Sitzplätze", value: car.seats },
                              {
                                label: "Garantie",
                                value: car.warranty ? "Ja" : "Nein",
                              },
                              {
                                label: "Full Service Historie",
                                value: car.fullServiceHistory ? "Ja" : "Nein",
                              },
                              {
                                label: "Unfallschaden",
                                value: car.accidentDamaged ? "Ja" : "Nein",
                              },
                            ]}
                          />
                        </div>
                      </div>
                    )}
                    {activeTab === "beschreibung" && car.description && (
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
                          Beschreibung
                        </h2>
                        <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-2">
                          {renderDescription(car.description)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 md:space-y-6">
                {/* Contact Card */}
                <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-4 md:p-6 border border-gray-200">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="bg-red-100 p-1 md:p-2 rounded-full">
                      <FaCar className="text-red-600 text-sm md:text-base" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                      Fahrzeug anfragen
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-gradient-to-br from-red-600 to-black hover:bg-red-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-lg font-medium text-sm md:text-lg transition-colors duration-200 mb-2 md:mb-3 flex items-center justify-center gap-1 md:gap-2"
                  >
                    <FaCar className="text-xs md:text-sm" />
                    Probefahrt vereinbaren
                  </button>

                  <div className="mt-2 md:mt-4 text-xs md:text-sm text-gray-500 text-center">
                    Unser Team meldet sich umgehend bei Ihnen
                  </div>
                </div>

                {/* Highlights Card */}
                <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-4 md:p-6">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="bg-red-100 p-1 md:p-2 rounded-full">
                      <FaSun className="text-red-600 text-sm md:text-base" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                      Highlights
                    </h3>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {[
                      car.panoramicGlassRoof && "Panoramadach",
                      car.navigationSystem && "Navigationssystem",
                      car.leatherSteeringWheel && "Lederlenkrad",
                      car.electricAdjustableSeats && "Elektrische Sitze",
                      car.keylessEntry && "Keyless Entry",
                      car.headUpDisplay && "Head-Up-Display",
                      car.summerTires && "Sommerreifen",
                      car.winterTires && "Winterreifen",
                      car.fullServiceHistory && "Scheckheft gepflegt",
                      car.newHuAu &&
                        `TÜV ${
                          typeof car.newHuAu === "string" &&
                          car.newHuAu.includes("Neu")
                            ? "neu"
                            : "bis " + car.newHuAu
                        }`,
                      car.hasAllSeasonTires && "Ganzjahresreifen",
                    ]
                      .filter(Boolean)
                      .map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <div className="bg-red-100 p-1 rounded-full mr-2 md:mr-3">
                            <BsCheck2 className="text-red-600 text-xs md:text-sm" />
                          </div>
                          <span className="text-xs md:text-sm text-gray-700">
                            {highlight}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Finance Calculator */}
                <FinanceCalculatorAdvanced
                  price={car.price.consumerPriceGross}
                />
              </div>
            </div>
          </div>

          {/* Contact Modal */}
          {showContactForm && (
            <div className="fixed inset-0  bg-black/70 z-50 flex items-center justify-center p-2 pb-8  backdrop-blur-sm pt-25 ">
              <div className="bg-white rounded-lg md:rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg md:shadow-2xl">
                <div className="bg-gradient-to-r from-red-600 to-red-800 p-2 md:p-4 rounded-t-lg md:rounded-t-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        Probefahrt anfragen
                      </h3>
                      <p className="text-red-100 text-xs md:text-sm mt-1">
                        {car.make} {car.model}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowContactForm(false)}
                      className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
                      aria-label="Close"
                    >
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={car.images?.[0]?.ref || "/default-car.jpg"}
                        alt={`${car.make} ${car.model}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 48px, 64px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">
                        {car.make} {car.model}
                      </h4>
                      <p className="text-red-600 text-base md:text-lg font-semibold">
                        {formatPrice(car.price)}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {car.mileage?.toLocaleString("de-DE")} km •{" "}
                        {formatDate(car.firstRegistration)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <ContactForm car={car} />
                </div>
                <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-200 pt-4 md:pt-6 text-center text-xs text-gray-400">
                  Ihre Anfrage wird direkt an unser Verkaufsteam weitergeleitet.
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default CarDetailContent;
