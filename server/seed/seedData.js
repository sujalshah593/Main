/**
 * Seeds MongoDB with labs, experiments (theory, procedures, simulator configs), optional demo feedback,
 * and per-experiment `practicalPdfPath` pointing at files under `server/public/practicals/`.
 * Run: npm run seed (from server directory)
 */
require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const Lab = require("../models/Lab");
const Experiment = require("../models/Experiment");
const Feedback = require("../models/Feedback");

const simulator = {
  fh: {
    palette: [
      {
        type: "powerSupply",
        label: "Power Supply",
        description: "Variable accelerating voltage",
      },
      {
        type: "tube",
        label: "Franck–Hertz Tube",
        description: "Mercury-filled electron tube",
      },
      {
        type: "ammeter",
        label: "Ammeter",
        description: "Measures emission current",
      },
      {
        type: "voltmeter",
        label: "Voltmeter",
        description: "Measures accelerating voltage",
      },
      {
        type: "switch",
        label: "Switch",
        description: "Completes the high-voltage path",
      },
    ],
    correctConnections: [
      {
        fromType: "powerSupply",
        fromHandle: "plus",
        toType: "switch",
        toHandle: "in",
      },
      {
        fromType: "switch",
        fromHandle: "out",
        toType: "ammeter",
        toHandle: "in",
      },
      {
        fromType: "ammeter",
        fromHandle: "out",
        toType: "tube",
        toHandle: "anode",
      },
      {
        fromType: "tube",
        fromHandle: "cathode",
        toType: "voltmeter",
        toHandle: "in",
      },
      {
        fromType: "voltmeter",
        fromHandle: "out",
        toType: "powerSupply",
        toHandle: "minus",
      },
    ],
    hintText:
      "Route from source (+) through measurement devices first, then back to the supply return (-).",
    hintImagePath: "/practicals/hints/franck-hertz-hint.png",
  },
  photo: {
    palette: [
      {
        type: "powerSupply",
        label: "Power Supply",
        description: "Accelerating potential for photoelectrons",
      },
      {
        type: "tube",
        label: "Photo-tube",
        description: "Cathode + anode in evacuated envelope",
      },
      { type: "ammeter", label: "Microammeter", description: "Photocurrent" },
      {
        type: "voltmeter",
        label: "Voltmeter",
        description: "Stopping potential readout",
      },
      {
        type: "switch",
        label: "Switch",
        description: "Enables discharge path",
      },
    ],
    correctConnections: [
      {
        fromType: "powerSupply",
        fromHandle: "plus",
        toType: "switch",
        toHandle: "in",
      },
      {
        fromType: "switch",
        fromHandle: "out",
        toType: "tube",
        toHandle: "anode",
      },
      {
        fromType: "tube",
        fromHandle: "cathode",
        toType: "ammeter",
        toHandle: "in",
      },
      {
        fromType: "ammeter",
        fromHandle: "out",
        toType: "voltmeter",
        toHandle: "in",
      },
      {
        fromType: "voltmeter",
        fromHandle: "out",
        toType: "powerSupply",
        toHandle: "minus",
      },
    ],
    hintText:
      "Connect the phototube path first, then add meters in sequence before closing the return.",
  },
  electron: {
    palette: [
      {
        type: "powerSupply",
        label: "Electron Gun Supply",
        description: "Accelerates electrons",
      },
      {
        type: "tube",
        label: "Diffraction Chamber",
        description: "Graphite foil target",
      },
      {
        type: "ammeter",
        label: "Ammeter",
        description: "Beam current monitor",
      },
      { type: "voltmeter", label: "Voltmeter", description: "Gun voltage" },
      { type: "switch", label: "Switch", description: "Beam on/off" },
    ],
    correctConnections: [
      {
        fromType: "powerSupply",
        fromHandle: "plus",
        toType: "voltmeter",
        toHandle: "in",
      },
      {
        fromType: "voltmeter",
        fromHandle: "out",
        toType: "switch",
        toHandle: "in",
      },
      {
        fromType: "switch",
        fromHandle: "out",
        toType: "tube",
        toHandle: "anode",
      },
      {
        fromType: "tube",
        fromHandle: "cathode",
        toType: "ammeter",
        toHandle: "in",
      },
      {
        fromType: "ammeter",
        fromHandle: "out",
        toType: "powerSupply",
        toHandle: "minus",
      },
    ],
  },
  soldering: {
    palette: [
      {
        type: "powerSupply",
        label: "Bench Supply",
        description: "Low-voltage heater supply",
      },
      {
        type: "tube",
        label: "Soldering Iron Tip",
        description: "Thermal mass + sensor",
      },
      { type: "ammeter", label: "Ammeter", description: "Heater current" },
      {
        type: "voltmeter",
        label: "Voltmeter",
        description: "Tip voltage sense",
      },
      {
        type: "switch",
        label: "Foot Switch",
        description: "Remote trigger path",
      },
    ],
    correctConnections: [
      {
        fromType: "powerSupply",
        fromHandle: "plus",
        toType: "switch",
        toHandle: "in",
      },
      {
        fromType: "switch",
        fromHandle: "out",
        toType: "ammeter",
        toHandle: "in",
      },
      {
        fromType: "ammeter",
        fromHandle: "out",
        toType: "tube",
        toHandle: "anode",
      },
      {
        fromType: "tube",
        fromHandle: "cathode",
        toType: "voltmeter",
        toHandle: "in",
      },
      {
        fromType: "voltmeter",
        fromHandle: "out",
        toType: "powerSupply",
        toHandle: "minus",
      },
    ],
  },
  quantum: {
    palette: [
      {
        type: "powerSupply",
        label: "Laser Driver",
        description: "Pump source",
      },
      {
        type: "tube",
        label: "Interferometer Stage",
        description: "Beam splitter assembly",
      },
      {
        type: "ammeter",
        label: "Detector Current",
        description: "Single-photon counter",
      },
      {
        type: "voltmeter",
        label: "Bias Monitor",
        description: "Detector bias",
      },
      { type: "switch", label: "Shutter", description: "Path selection" },
    ],
    correctConnections: [
      {
        fromType: "powerSupply",
        fromHandle: "plus",
        toType: "switch",
        toHandle: "in",
      },
      {
        fromType: "switch",
        fromHandle: "out",
        toType: "tube",
        toHandle: "anode",
      },
      {
        fromType: "tube",
        fromHandle: "cathode",
        toType: "ammeter",
        toHandle: "in",
      },
      {
        fromType: "ammeter",
        fromHandle: "out",
        toType: "voltmeter",
        toHandle: "in",
      },
      {
        fromType: "voltmeter",
        fromHandle: "out",
        toType: "powerSupply",
        toHandle: "minus",
      },
    ],
  },
  electronics: {
    palette: [
      {
        type: "powerSupply",
        label: "DC Supply",
        description: "Vcc for amplifier",
      },
      {
        type: "tube",
        label: "BJT Stage",
        description: "Common-emitter transistor",
      },
      { type: "ammeter", label: "Collector Ammeter", description: "Ic" },
      {
        type: "voltmeter",
        label: "Vce Meter",
        description: "Collector voltage",
      },
      {
        type: "switch",
        label: "Bias Switch",
        description: "Base bias network",
      },
    ],
    correctConnections: [
      {
        fromType: "powerSupply",
        fromHandle: "plus",
        toType: "ammeter",
        toHandle: "in",
      },
      {
        fromType: "ammeter",
        fromHandle: "out",
        toType: "tube",
        toHandle: "anode",
      },
      {
        fromType: "tube",
        fromHandle: "cathode",
        toType: "switch",
        toHandle: "in",
      },
      {
        fromType: "switch",
        fromHandle: "out",
        toType: "voltmeter",
        toHandle: "in",
      },
      {
        fromType: "voltmeter",
        fromHandle: "out",
        toType: "powerSupply",
        toHandle: "minus",
      },
    ],
  },
};

const selfEval = {
  basic: [
    {
      question: "What quantity does an ammeter measure?",
      options: ["Voltage", "Current", "Resistance", "Power"],
      correctIndex: 1,
    },
    {
      question: "A voltmeter should be connected in:",
      options: [
        "Series with the load",
        "Parallel across the load",
        "Short across supply",
        "Open circuit only",
      ],
      correctIndex: 1,
    },
  ],
};

async function seed() {
  await connectDB();
  await Feedback.deleteMany({});
  await Experiment.deleteMany({});
  await Lab.deleteMany({});

  const labs = await Lab.insertMany([
    {
      name: "Modern Physics Virtual Lab",
      description:
        "Classic twentieth-century experiments: quantized excitation, photoelectric threshold, and matter waves.",
    },
    {
      name: "Quantum Physics Lab",
      description:
        "Foundational quantum demonstrations including interference, measurement, and discrete spectra.",
    },
    {
      name: "Electronics Lab",
      description:
        "Hands-on circuit intuition: biasing, amplification, and measurement with virtual instruments.",
    },
    {
      name: "Optics Lab",
      description:
        "Explore wave phenomena with virtual lasers, lenses, and interferometers for guided optics experiments.",
    },
  ]);

  const byName = (n) => labs.find((l) => l.name === n);

  await Experiment.insertMany([
    {
      labId: byName("Modern Physics Virtual Lab")._id,
      title: "Franck–Hertz Experiment",
      practicalPdfPath: "/practicals/franck-hertz.pdf",
      theory:
        "<p>In the Franck–Hertz experiment, electrons collide inelastically with mercury atoms. When electron kinetic energy reaches the first excitation energy of Hg, current drops sharply because many electrons lose energy and can no longer overcome the retarding field.</p><p>Repeating drops at multiples of the excitation energy evidences <strong>quantized atomic energy levels</strong>.</p>",
      procedure:
        "<ol><li>Evacuate the tube and establish a controlled vapor pressure.</li><li>Heat the cathode to emit electrons; apply accelerating voltage <em>V</em>.</li><li>Measure anode current versus <em>V</em> and locate periodic minima.</li><li>Estimate excitation energy from spacing between minima.</li></ol>",
      assignment:
        "<p>Plot anode current vs accelerating voltage for three vapor pressures. Explain broadening of features as pressure increases.</p>",
      references:
        "<ul><li>Franck & Hertz (1914), original collision experiment.</li><li>Serway & Jewett, <em>Physics for Scientists and Engineers</em>.</li></ul>",
      selfEvaluation: selfEval.basic,
      simulatorConfig: simulator.fh,
    },
    
    {
      labId: byName("Modern Physics Virtual Lab")._id,
      title: "Soldering (Remote Trigger)",
      practicalPdfPath: "/practicals/soldering-remote-trigger.pdf",
      theory:
        "<p>Remote-trigger soldering stations isolate the operator from mains switching. A low-voltage foot switch controls a relay that energizes the ceramic heater element.</p>",
      procedure:
        "<ol><li>Verify cold tip resistance and thermistor bias.</li><li>Route heater current through the foot switch for safety.</li><li>Monitor tip temperature via sense leads on the voltmeter channel.</li></ol>",
      assignment:
        "<p>Design a checklist for ESD-safe remote triggering in a teaching lab.</p>",
      references:
        "<ul><li>IPC soldering handbooks.</li><li>University electronics shop safety guides.</li></ul>",
      selfEvaluation: selfEval.basic,
      simulatorConfig: simulator.soldering,
    },
    {
      labId: byName("Modern Physics Virtual Lab")._id,
      title: "Photoelectric Effect",
      practicalPdfPath: "/practicals/photoelectric-effect.pdf",
      theory:
        "<p>Einstein's relation <em>E = hf − φ</em> predicts a linear stopping potential versus frequency with slope <em>h/e</em>. Classical wave theory cannot explain instantaneous emission or frequency threshold.</p>",
      procedure:
        "<ol><li>Select filter wavelengths; measure photocurrent vs retarding voltage.</li><li>Extrapolate stopping potential for each frequency.</li><li>Fit <em>V<sub>s</sub></em> vs <em>f</em> to extract work function and Planck constant.</li></ol>",
      assignment:
        "<p>Compare your extracted <em>h</em> with CODATA value; discuss dominant uncertainty sources.</p>",
      references:
        "<ul><li>Millikan oil-drop and photoelectric historical papers.</li><li>Tipler & Llewellyn, <em>Modern Physics</em>.</li></ul>",
      selfEvaluation: selfEval.basic,
      simulatorConfig: simulator.photo,
    },
    {
      labId: byName("Modern Physics Virtual Lab")._id,
      title: "Electron Diffraction",
      practicalPdfPath: "/practicals/electron-diffraction.pdf",
      theory:
        "<p>De Broglie wavelength <em>λ = h/p</em> leads to Bragg-like rings when electrons scatter from polycrystalline graphite. Ring diameters scale inversely with accelerating voltage.</p>",
      procedure:
        "<ol><li>Align electron gun optics; ramp high voltage slowly.</li><li>Record fluorescent screen pattern at several gun voltages.</li><li>Measure ring radii; infer lattice spacing using Bragg law.</li></ol>",
      assignment:
        "<p>Estimate graphite inter-plane spacing from two independent ring families.</p>",
      references:
        "<ul><li>Davisson–Germer and Thomson experiments.</li><li>University open-course diffraction notes.</li></ul>",
      selfEvaluation: selfEval.basic,
      simulatorConfig: simulator.electron,
    },
    {
      labId: byName("Quantum Physics Lab")._id,
      title: "Double-Slit Interference (Low Intensity)",
      practicalPdfPath: "/practicals/double-slit-interference.pdf",
      theory:
        "<p>At sufficiently low flux, single clicks appear at the detector, yet a statistical pattern reproduces interference—evidence of wave–particle duality.</p>",
      procedure:
        "<ol><li>Attenuate source until clicks are sparse.</li><li>Accumulate histogram over long integration time.</li><li>Compare fringe spacing to de Broglie wavelength for the particles.</li></ol>",
      assignment:
        "<p>Explain why closing one slit removes fringes even when only one photon is in flight at a time.</p>",
      references:
        "<ul><li>Feynman Lectures Vol. III.</li><li>Zeilinger, <em>Dance of the Photons</em>.</li></ul>",
      selfEvaluation: selfEval.basic,
      simulatorConfig: simulator.quantum,
    },
    {
      labId: byName("Quantum Physics Lab")._id,
      title: "Particle in a Box: Energy Quantization",
      practicalPdfPath: "/practicals/particle-in-a-box.pdf",
      theory:
        "<p>Infinite square well energies <em>E<sub>n</sub> = n²h²/(8mL²)</em> explain discrete absorption lines in semiconductor quantum wells.</p>",
      procedure:
        "<ol><li>Sweep bias across nano-scale well sample.</li><li>Record differential conductance peaks.</li><li>Assign quantum numbers to observed transitions.</li></ol>",
      assignment:
        "<p>From two peaks, infer well width assuming electron effective mass <em>m*</em> = 0.067<em>m<sub>e</sub></em>.</p>",
      references:
        "<ul><li>Griffiths, <em>Introduction to Quantum Mechanics</em>.</li></ul>",
      selfEvaluation: selfEval.basic,
      simulatorConfig: simulator.quantum,
    },
    {
      labId: byName("Electronics Lab")._id,
      title: "Common-Emitter Amplifier Biasing",
      practicalPdfPath: "/practicals/common-emitter-amplifier.pdf",
      theory:
        "<p>Stable Q-point requires the base–emitter loop to fix <em>I<sub>B</sub></em> while the collector resistor sets <em>V<sub>CE</sub></em> for linear swing.</p>",
      procedure:
        "<ol><li>Build voltage-divider bias with emitter degeneration.</li><li>Measure <em>I<sub>C</sub></em> and <em>V<sub>CE</sub></em> at quiescence.</li><li>Inject small AC signal; observe gain versus load.</li></ol>",
      assignment:
        "<p>Simulate gain change if bypass capacitor across <em>R<sub>E</sub></em> is removed—explain in one paragraph.</p>",
      references:
        "<ul><li>Sedra & Smith, <em>Microelectronic Circuits</em>.</li></ul>",
      selfEvaluation: selfEval.basic,
      simulatorConfig: simulator.electronics,
    },
    {
      labId: byName("Electronics Lab")._id,
      title: "Zener Voltage Regulator",
      practicalPdfPath: "/practicals/zener-voltage-regulator.pdf",
      theory:
        "<p>A Zener diode operated in reverse breakdown maintains nearly constant voltage across the load for input ripple within design limits.</p>",
      procedure:
        "<ol><li>Choose series resistor for max load current.</li><li>Verify line regulation by varying input.</li><li>Verify load regulation by stepping load resistor.</li></ol>",
      assignment:
        "<p>Compute power dissipation in the Zener at no load; discuss thermal limits.</p>",
      references:
        "<ul><li>Horowitz & Hill, <em>The Art of Electronics</em>.</li></ul>",
      selfEvaluation: selfEval.basic,
      simulatorConfig: simulator.electronics,
    },

  ]);

  const first = await Experiment.findOne().lean();
  if (first) {
    await Feedback.create({
      experimentId: first._id,
      message: "Seeded demo feedback — clear theory and intuitive simulator.",
      rating: 5,
    });
  }

  console.log("Seed completed successfully.");
  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
