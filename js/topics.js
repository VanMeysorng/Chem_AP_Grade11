// topics.js - AP Chemistry Comprehensive Pre-Test (Units 1-9)
// Strictly based on uploaded AP Chemistry notes

// Helper function to shuffle options for multiple choice
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function randomizeQuestion(question) {
    if (question.type === 'mc') {
        const originalCorrect = question.correct;
        const options = [...question.options];
        const shuffled = shuffleArray([...options]);
        return {
            ...question,
            options: shuffled,
            correct: originalCorrect
        };
    }
    return question;
}

// AP Chemistry Pre-Test - 40 questions covering Units 1-9
// Question types: mc (multiple choice), sa (short answer), fr (free response)
const PRETEST_QUESTIONS = [
    // ==================== UNIT 1: Atomic Structure & Properties ====================
    {
        type: "mc",
        text: "A student has a 10.0 g sample of CaBr₂. Which expression correctly shows how to calculate the number of moles of CaBr₂? (Molar mass of CaBr₂ = 199.88 g/mol)",
        options: ["10.0 g × 199.88 g/mol", "10.0 g / 199.88 g/mol", "199.88 g/mol / 10.0 g", "10.0 g × (6.02 × 10²³)"],
        correct: "10.0 g / 199.88 g/mol",
        hint: "n = m / M, so moles = mass ÷ molar mass",
        unit: "Unit 1: Moles & Molar Mass"
    },
    {
        type: "mc",
        text: "The mass spectrum of an element shows two peaks at masses 69 and 71 with relative abundances 60% and 40%. What is the average atomic mass?",
        options: ["69.8 amu", "70.0 amu", "69.2 amu", "70.2 amu"],
        correct: "69.8 amu",
        hint: "(69 × 0.60) + (71 × 0.40) = 41.4 + 28.4 = 69.8 amu",
        unit: "Unit 1: Mass Spectra"
    },
    {
        type: "sa",
        text: "A 2.50 g sample of copper is heated in air and forms 3.13 g of an oxide. Determine the empirical formula of this copper oxide. (Cu = 63.55 g/mol, O = 16.00 g/mol)",
        correctAnswer: "CuO. Mass O = 3.13 - 2.50 = 0.63 g. Moles Cu = 2.50/63.55 = 0.0393 mol. Moles O = 0.63/16.00 = 0.0394 mol. Ratio 1:1 → CuO.",
        hint: "Find mass of oxygen by subtracting, then convert to moles, then find simplest ratio.",
        unit: "Unit 1: Empirical Formula",
        disclaimer: "Show all calculations and clearly state the final empirical formula."
    },
    {
        type: "mc",
        text: "A photoelectron spectrum shows peaks with relative heights: 2, 2, 6, 2, 3. Which element is represented?",
        options: ["Phosphorus (P)", "Sulfur (S)", "Silicon (Si)", "Chlorine (Cl)"],
        correct: "Phosphorus (P)",
        hint: "Configuration: 1s²2s²2p⁶3s²3p³ → total 15 electrons → Phosphorus",
        unit: "Unit 1: Photoelectron Spectroscopy"
    },
    {
        type: "fr",
        text: "Use Coulomb's law (F ∝ q₁q₂/r²) to explain why the atomic radius of Li is larger than that of Be, and why the first ionization energy of Be is greater than that of Li.",
        correctAnswer: "Li has nuclear charge 3+ with configuration 1s²2s¹; Be has nuclear charge 4+ with configuration 1s²2s². The greater nuclear charge in Be pulls electrons closer, resulting in a smaller atomic radius. For ionization energy, Be has higher effective nuclear charge (4+ vs 3+ with similar shielding), requiring more energy to remove a valence electron.",
        hint: "Consider nuclear charge and electron shielding effects.",
        unit: "Unit 1: Coulomb's Law & Periodic Trends",
        disclaimer: "Write a complete paragraph explaining both concepts. Reference both Li and Be specifically. Use Coulomb's law in your explanation."
    },
    {
        type: "sa",
        text: "The mass percent of carbon in pure glucose (C₆H₁₂O₆) is 40.0%. A chemist analyzes an impure sample and finds 38.2% carbon. Which impurity (water, ribose, fructose, or sucrose) could account for the low carbon percentage? Justify your answer.",
        correctAnswer: "Water (H₂O). Water contains no carbon, so adding it to glucose would dilute the carbon content, lowering the mass percent of carbon. Fructose is an isomer of glucose with same carbon percentage, ribose has higher carbon content, sucrose has carbon content similar to glucose.",
        hint: "Consider which impurity has a lower mass percent of carbon than glucose.",
        unit: "Unit 1: Composition of Mixtures",
        disclaimer: "Identify the impurity and provide a clear justification based on carbon content."
    },

    // ==================== UNIT 2: Molecular & Ionic Compound Structure ====================
    {
        type: "mc",
        text: "Which of the following molecules has a central atom with an expanded octet (more than 8 electrons)?",
        options: ["SF₆", "CH₄", "H₂O", "BF₃"],
        correct: "SF₆",
        hint: "Sulfur in SF₆ uses d orbitals and has 12 electrons around it.",
        unit: "Unit 2: Lewis Structures & Octet Exceptions"
    },
    {
        type: "mc",
        text: "What is the molecular geometry of the chlorate ion (ClO₃⁻)?",
        options: ["Trigonal planar", "Trigonal pyramidal", "Tetrahedral", "Bent"],
        correct: "Trigonal pyramidal",
        hint: "ClO₃⁻ has 3 bonding domains and one lone pair → trigonal pyramidal.",
        unit: "Unit 2: VSEPR Theory"
    },
    {
        type: "fr",
        text: "Draw the Lewis structure for SO₂, including all resonance forms. Describe the molecular geometry and explain whether the molecule is polar or nonpolar.",
        correctAnswer: "SO₂ has resonance structures with S=O double bonds and a lone pair on S. Electron geometry: trigonal planar. Molecular geometry: bent (due to one lone pair). The molecule is polar because the bent shape creates an uneven distribution of charge, and oxygen is more electronegative than sulfur.",
        hint: "Sulfur has 6 valence electrons, each oxygen has 6. Total 18 electrons. Two resonance structures exist.",
        unit: "Unit 2: Resonance & Polarity",
        disclaimer: "Draw clear Lewis structures. Label the geometry. Explain polarity using bond dipoles and molecular shape."
    },
    {
        type: "sa",
        text: "Explain why the melting point of MgO is significantly higher than that of NaCl, using Coulomb's law and the concept of lattice energy.",
        correctAnswer: "MgO has Mg²⁺ and O²⁻ ions (charges +2 and -2) while NaCl has Na⁺ and Cl⁻ (charges +1 and -1). According to Coulomb's law, F ∝ q₁q₂/r², the greater ionic charges in MgO produce much stronger electrostatic attractions, resulting in higher lattice energy and higher melting point.",
        hint: "Consider both ionic charges and ionic radii.",
        unit: "Unit 2: Ionic Solids",
        disclaimer: "Reference both compounds. Include the Coulomb's law relationship in your explanation."
    },
    {
        type: "mc",
        text: "Which compound exhibits hydrogen bonding as the dominant intermolecular force?",
        options: ["CH₃CH₂OH", "CH₃OCH₃", "CCl₄", "CO₂"],
        correct: "CH₃CH₂OH",
        hint: "Ethanol has O–H bond, can form hydrogen bonds with neighboring molecules.",
        unit: "Unit 2: Intermolecular Forces"
    },

    // ==================== UNIT 3: Intermolecular Forces & Properties ====================
    {
        type: "sa",
        text: "Rank the following compounds in order of increasing boiling point: CH₄, H₂O, H₂S, and CH₃OH. Justify your answer based on intermolecular forces.",
        correctAnswer: "CH₄ < H₂S < CH₃OH < H₂O. CH₄ has only London dispersion forces (weakest). H₂S has dipole-dipole forces. CH₃OH has hydrogen bonding. H₂O has stronger hydrogen bonding (two H-bonds per molecule) than CH₃OH.",
        hint: "Consider London dispersion, dipole-dipole, and hydrogen bonding.",
        unit: "Unit 3: Intermolecular Forces",
        disclaimer: "List the compounds in order. Explain each compound's dominant IMF and how it affects boiling point."
    },
    {
        type: "mc",
        text: "A sample of an ideal gas is heated from 25°C to 50°C at constant volume. What happens to the pressure?",
        options: ["Doubles", "Increases by a factor of about 1.08", "Decreases by half", "Remains constant"],
        correct: "Increases by a factor of about 1.08",
        hint: "P₁/T₁ = P₂/T₂; T must be in Kelvin: 298K → 323K, ratio = 323/298 ≈ 1.08",
        unit: "Unit 3: Ideal Gas Law"
    },
    {
        type: "fr",
        text: "A student collects oxygen gas over water at 25.0°C. The total pressure in the collection tube is 755 torr. The vapor pressure of water at 25.0°C is 23.8 torr. Calculate the partial pressure of oxygen gas. If the volume of gas collected is 0.250 L, how many moles of oxygen were produced? (R = 0.0821 L·atm/mol·K)",
        correctAnswer: "P_O₂ = 755 - 23.8 = 731.2 torr = 0.962 atm. n = PV/RT = (0.962 atm × 0.250 L)/(0.0821 × 298 K) = 0.00983 mol O₂.",
        hint: "Use Dalton's law: P_total = P_gas + P_water. Convert torr to atm (760 torr = 1 atm).",
        unit: "Unit 3: Gas Laws & Partial Pressures",
        disclaimer: "Show all steps. Include unit conversions. Report answer with correct significant figures."
    },
    {
        type: "mc",
        text: "According to the Beer-Lambert law, absorbance is directly proportional to:",
        options: ["Concentration and path length", "Concentration only", "Transmittance", "Molar mass"],
        correct: "Concentration and path length",
        hint: "A = εbc, proportional to concentration (c) and path length (b).",
        unit: "Unit 3: Beer-Lambert Law"
    },
    {
        type: "sa",
        text: "Explain why real gases deviate from ideal behavior at high pressures and low temperatures. Provide specific molecular-level reasoning.",
        correctAnswer: "At high pressures, gas molecules are forced close together, making the volume of the molecules themselves significant (not negligible). At low temperatures, molecules have lower kinetic energy, making intermolecular attractions more significant. Both factors cause deviations from the ideal gas law.",
        hint: "Consider the two main assumptions of kinetic molecular theory that break down.",
        unit: "Unit 3: Deviation from Ideal Gas Law",
        disclaimer: "Address both high pressure and low temperature conditions separately. Use molecular-level explanations."
    },

    // ==================== UNIT 4: Chemical Reactions ====================
    {
        type: "mc",
        text: "When aqueous solutions of Pb(NO₃)₂ and KI are mixed, a yellow precipitate forms. What is the net ionic equation?",
        options: ["Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)", "Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃", "K⁺ + NO₃⁻ → KNO₃(aq)", "Pb²⁺ + I⁻ → PbI(s)"],
        correct: "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)",
        hint: "Spectator ions K⁺ and NO₃⁻ are removed; PbI₂ is the yellow precipitate.",
        unit: "Unit 4: Net Ionic Equations"
    },
    {
        type: "sa",
        text: "Balance the following redox reaction in acidic solution: MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺. Identify the oxidizing agent and reducing agent.",
        correctAnswer: "Balanced: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. Oxidizing agent: MnO₄⁻ (Mn is reduced from +7 to +2). Reducing agent: Fe²⁺ (Fe is oxidized from +2 to +3).",
        hint: "Balance O with H₂O, H with H⁺, then balance charge with electrons.",
        unit: "Unit 4: Redox Reactions",
        disclaimer: "Show the half-reactions. Indicate which species is oxidized and which is reduced."
    },
    {
        type: "fr",
        text: "A 25.0 mL sample of 0.100 M HCl is titrated with 0.100 M NaOH. Calculate the pH after adding 0 mL, 12.5 mL, 25.0 mL, and 30.0 mL of NaOH. Describe the shape of the titration curve and identify the equivalence point.",
        correctAnswer: "0 mL: pH = -log(0.100) = 1.00. 12.5 mL: half-equivalence, pH = pKa = 7 (strong acid-strong base). 25.0 mL: equivalence point, pH = 7.00. 30.0 mL: excess OH⁻, [OH⁻] = (5.0×0.100)/(55.0) = 0.00909 M, pOH = 2.04, pH = 11.96. Curve shows rapid pH change near equivalence point (25 mL).",
        hint: "For strong acid-strong base titration, pH at equivalence = 7.00.",
        unit: "Unit 4: Acid-Base Titrations",
        disclaimer: "Show calculations for each point. Sketch and describe the curve shape. Label the equivalence point."
    },
    {
        type: "mc",
        text: "In the reaction 2H₂O₂(aq) → 2H₂O(l) + O₂(g), which element is both oxidized and reduced?",
        options: ["Oxygen", "Hydrogen", "None, it's not redox", "Both H and O"],
        correct: "Oxygen",
        hint: "In H₂O₂, O has oxidation state -1; in H₂O, O is -2 (reduced); in O₂, O is 0 (oxidized).",
        unit: "Unit 4: Redox Reactions"
    },

    // ==================== UNIT 5: Kinetics ====================
    {
        type: "sa",
        text: "For the reaction 2NO(g) + O₂(g) → 2NO₂(g), the following data were collected: Experiment 1: [NO]=0.020, [O₂]=0.010, rate=0.028; Experiment 2: [NO]=0.040, [O₂]=0.010, rate=0.112; Experiment 3: [NO]=0.020, [O₂]=0.020, rate=0.056. Determine the rate law and calculate the rate constant k with units.",
        correctAnswer: "Rate = k[NO]²[O₂]. From exp 1 to 2: [NO] doubles, rate quadruples → order 2 for NO. From exp 1 to 3: [O₂] doubles, rate doubles → order 1 for O₂. k = rate/([NO]²[O₂]) = 0.028/(0.020²×0.010) = 0.028/(4×10⁻⁶) = 7000 M⁻²s⁻¹.",
        hint: "Compare experiments where one concentration changes while the other stays constant.",
        unit: "Unit 5: Rate Laws",
        disclaimer: "Show your reasoning for determining each order. Include units in your final rate constant."
    },
    {
        type: "mc",
        text: "A first-order reaction has a half-life of 20 minutes. What fraction of the reactant remains after 60 minutes?",
        options: ["1/2", "1/4", "1/8", "1/16"],
        correct: "1/8",
        hint: "60 minutes = 3 half-lives. After 1 half-life: 1/2; after 2: 1/4; after 3: 1/8.",
        unit: "Unit 5: Half-Life"
    },
    {
        type: "fr",
        text: "Draw and label a reaction energy diagram for an exothermic reaction. Label the activation energy (Ea), the enthalpy change (ΔH), the reactants, products, and the transition state. Explain how a catalyst affects the diagram.",
        correctAnswer: "Diagram should show reactants higher energy than products (ΔH negative). Ea is the energy barrier from reactants to transition state. A catalyst lowers the activation energy (Ea) by providing an alternative pathway, but does not change ΔH or the energies of reactants/products.",
        hint: "Exothermic means products have lower energy than reactants.",
        unit: "Unit 5: Reaction Energy Profiles",
        disclaimer: "Draw a clear diagram with labeled axes. Explain both the uncatalyzed and catalyzed pathways."
    },
    {
        type: "sa",
        text: "The decomposition of N₂O₅ is first order with a rate constant of 6.22 × 10⁻⁴ s⁻¹ at 45°C. If the initial concentration is 0.500 M, how long will it take for the concentration to drop to 0.0500 M? Use ln[A]ₜ - ln[A]₀ = -kt.",
        correctAnswer: "ln(0.0500) - ln(0.500) = - (6.22×10⁻⁴)t. ln(0.1) = -2.303 = - (6.22×10⁻⁴)t. t = 2.303/(6.22×10⁻⁴) = 3700 s.",
        hint: "Use the integrated rate law for first-order reactions.",
        unit: "Unit 5: Concentration Changes over Time",
        disclaimer: "Show all steps. Include units in your final answer."
    },

    // ==================== UNIT 6: Thermodynamics ====================
    {
        type: "sa",
        text: "Calculate the enthalpy change for the reaction: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) using bond energies. (Bond energies: C-H = 413 kJ/mol, O=O = 498 kJ/mol, C=O = 799 kJ/mol, O-H = 467 kJ/mol)",
        correctAnswer: "ΔH = Σ(bonds broken) - Σ(bonds formed). Bonds broken: 4 C-H (1652) + 2 O=O (996) = 2648 kJ. Bonds formed: 2 C=O (1598) + 4 O-H (1868) = 3466 kJ. ΔH = 2648 - 3466 = -818 kJ/mol.",
        hint: "Bonds broken (endothermic, +), bonds formed (exothermic, -).",
        unit: "Unit 6: Bond Enthalpies",
        disclaimer: "List all bonds broken and formed. Show your calculation clearly. Indicate whether the reaction is exothermic or endothermic."
    },
    {
        type: "mc",
        text: "A reaction has ΔH = +50 kJ and ΔS = +100 J/K. At what temperature does it become thermodynamically favored (ΔG < 0)?",
        options: ["Above 500 K", "Below 500 K", "Above 50 K", "Never"],
        correct: "Above 500 K",
        hint: "ΔG = ΔH - TΔS. Set ΔG = 0 → T = ΔH/ΔS = 50,000 J / 100 J/K = 500 K. For ΔG < 0, T > 500 K.",
        unit: "Unit 6: Gibbs Free Energy"
    },
    {
        type: "fr",
        text: "Using Hess's Law, calculate ΔH° for the reaction: C(s) + 2H₂(g) → CH₄(g). Given: C(s) + O₂(g) → CO₂(g) ΔH° = -394 kJ, H₂(g) + ½O₂(g) → H₂O(l) ΔH° = -286 kJ, CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) ΔH° = -890 kJ.",
        correctAnswer: "Target: C + 2H₂ → CH₄. Use: (1) C + O₂ → CO₂ ΔH = -394; (2) 2H₂ + O₂ → 2H₂O ΔH = -572; (3) CO₂ + 2H₂O → CH₄ + 2O₂ ΔH = +890 (reverse). Add: C + 2H₂ + (O₂ + O₂ - 2O₂) → CH₄. ΔH = -394 -572 +890 = -76 kJ/mol.",
        hint: "Reverse the combustion of methane to get CH₄ as product.",
        unit: "Unit 6: Hess's Law",
        disclaimer: "Show each step of your manipulation. Indicate which equations are reversed or multiplied. Sum the ΔH values to get the final answer."
    },
    {
        type: "sa",
        text: "A 3.00 g chunk of coal (C) is burned in a bomb calorimeter. The mass of the bomb is 2.000 kg and the mass of water is 2.778 kg. The temperature rises from 21.00°C to 29.30°C. Calculate the enthalpy of combustion of carbon. (Specific heat of water = 4.18 J/g°C, specific heat of copper = 0.385 J/g°C)",
        correctAnswer: "q_total = q_water + q_bomb = (2778 g × 4.18 J/g°C × 8.30°C) + (2000 g × 0.385 J/g°C × 8.30°C) = 96,400 J + 6,390 J = 102,790 J. Moles C = 3.00/12.01 = 0.250 mol. ΔH_comb = -102.8 kJ / 0.250 mol = -411 kJ/mol.",
        hint: "Calculate heat absorbed by water and bomb, then divide by moles of carbon.",
        unit: "Unit 6: Calorimetry",
        disclaimer: "Show calculations for q_water, q_bomb, and total heat. Convert to kJ and divide by moles of carbon."
    },

    // ==================== UNIT 7: Equilibrium ====================
    {
        type: "sa",
        text: "For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), Kc = 4.5 at 400 K. If the initial concentrations are [N₂] = 0.50 M, [H₂] = 0.50 M, and [NH₃] = 0 M, calculate the equilibrium concentration of NH₃.",
        correctAnswer: "Let x = change in [N₂]. At equilibrium: [N₂] = 0.50 - x, [H₂] = 0.50 - 3x, [NH₃] = 2x. Kc = (2x)²/[(0.50-x)(0.50-3x)³] = 4.5. Solving: 4x² = 4.5(0.50-x)(0.50-3x)³. Approximate: 4x² ≈ 4.5(0.50)(0.50)³ = 4.5×0.5×0.125 = 0.281, x ≈ 0.265 M. [NH₃] = 0.53 M.",
        hint: "Use ICE table and solve the equilibrium expression.",
        unit: "Unit 7: Equilibrium Calculations",
        disclaimer: "Set up an ICE table. Show the equilibrium expression. Solve for x and calculate the final concentration."
    },
    {
        type: "mc",
        text: "For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) ΔH = -92 kJ. Increasing the temperature will shift the equilibrium:",
        options: ["Left (toward reactants)", "Right (toward products)", "No shift", "Depends on pressure"],
        correct: "Left (toward reactants)",
        hint: "Exothermic reaction; increasing T favors reverse endothermic direction.",
        unit: "Unit 7: Le Châtelier's Principle"
    },
    {
        type: "fr",
        text: "Write the Ksp expression for Ca₃(PO₄)₂. If the molar solubility of Ca₃(PO₄)₂ is S, express Ksp in terms of S. If Ksp = 1.2 × 10⁻²⁶, calculate the molar solubility.",
        correctAnswer: "Ca₃(PO₄)₂(s) ⇌ 3Ca²⁺(aq) + 2PO₄³⁻(aq). Ksp = [Ca²⁺]³[PO₄³⁻]² = (3S)³(2S)² = 27S³ × 4S² = 108S⁵. S = ∛(Ksp/108) = ∛(1.2×10⁻²⁶/108) = ∛(1.11×10⁻²⁸) = 4.8×10⁻⁶ M.",
        hint: "Molar solubility S produces 3S of Ca²⁺ and 2S of PO₄³⁻.",
        unit: "Unit 7: Solubility Equilibria",
        disclaimer: "Write the dissociation equation. Derive the Ksp expression in terms of S. Solve for S with the given Ksp."
    },
    {
        type: "sa",
        text: "The equilibrium constant for the reaction 2BrCl(g) ⇌ Br₂(g) + Cl₂(g) is 0.145 at 298 K. If 0.100 mol of BrCl is placed in a 2.00 L container, calculate the equilibrium concentrations of all species.",
        correctAnswer: "Initial [BrCl] = 0.0500 M. Let x = [Br₂] at equilibrium. [Cl₂] = x, [BrCl] = 0.0500 - 2x. K = x²/(0.0500-2x)² = 0.145. Taking square root: x/(0.0500-2x) = 0.381. x = 0.381(0.0500-2x) = 0.01905 - 0.762x. 1.762x = 0.01905, x = 0.0108 M. [Br₂] = [Cl₂] = 0.0108 M, [BrCl] = 0.0500 - 0.0216 = 0.0284 M.",
        hint: "Set up ICE table with x as change, use K expression.",
        unit: "Unit 7: Equilibrium Concentrations",
        disclaimer: "Set up an ICE table. Show your algebra. Report all equilibrium concentrations."
    },

    // ==================== UNIT 8: Acids & Bases ====================
    {
        type: "sa",
        text: "Calculate the pH of a 0.10 M solution of acetic acid (HC₂H₃O₂, Ka = 1.8 × 10⁻⁵). What is the percent ionization?",
        correctAnswer: "[H⁺] = √(Ka × C) = √(1.8×10⁻⁵ × 0.10) = √(1.8×10⁻⁶) = 1.34×10⁻³ M. pH = -log(1.34×10⁻³) = 2.87. Percent ionization = (1.34×10⁻³/0.10) × 100% = 1.34%.",
        hint: "For weak acids, [H⁺] ≈ √(Ka × C) when ionization is small.",
        unit: "Unit 8: Weak Acid Equilibria",
        disclaimer: "Show the calculation for [H⁺]. Calculate pH and percent ionization. Include units where appropriate."
    },
    {
        type: "mc",
        text: "A solution containing 0.10 M HC₂H₃O₂ and 0.10 M NaC₂H₃O₂ is a buffer. What is its pH? (Ka = 1.8 × 10⁻⁵)",
        options: ["2.87", "4.74", "7.00", "9.26"],
        correct: "4.74",
        hint: "pH = pKa + log([base]/[acid]) = -log(1.8×10⁻⁵) + log(1) = 4.74 + 0 = 4.74.",
        unit: "Unit 8: Buffers & Henderson-Hasselbalch"
    },
    {
        type: "fr",
        text: "Explain why HClO₂ is a stronger acid than HBrO₂. Use principles of molecular structure and electronegativity.",
        correctAnswer: "Both are oxyacids with formula HXO₂. Cl is more electronegative than Br, which draws electron density away from the O-H bond through inductive effect. This weakens the O-H bond and stabilizes the conjugate base (XO₂⁻) by delocalizing the negative charge. Therefore, HClO₂ has a larger Ka (is stronger) than HBrO₂.",
        hint: "Consider electronegativity and the stability of the conjugate base.",
        unit: "Unit 8: Molecular Structure of Acids",
        disclaimer: "Compare the electronegativities of Cl and Br. Explain the inductive effect and how it affects the conjugate base stability."
    },
    {
        type: "sa",
        text: "A 25.00 mL sample of 0.100 M NH₃ (Kb = 1.8 × 10⁻⁵) is titrated with 0.100 M HCl. Calculate the pH at the equivalence point.",
        correctAnswer: "At equivalence, moles NH₃ = moles HCl = 0.00250 mol. Total volume = 50.0 mL. [NH₄⁺] = 0.00250/0.0500 = 0.0500 M. NH₄⁺ is a weak acid with Ka = Kw/Kb = 1.0×10⁻¹⁴/1.8×10⁻⁵ = 5.6×10⁻¹⁰. [H⁺] = √(Ka × C) = √(5.6×10⁻¹⁰ × 0.0500) = √(2.8×10⁻¹¹) = 5.3×10⁻⁶ M. pH = -log(5.3×10⁻⁶) = 5.28.",
        hint: "At equivalence, the solution contains only NH₄⁺, the conjugate acid of NH₃.",
        unit: "Unit 8: Acid-Base Titrations",
        disclaimer: "Calculate moles and concentration of NH₄⁺. Determine Ka for NH₄⁺. Calculate [H⁺] and pH."
    },
    {
        type: "mc",
        text: "The pH of pure water at 50°C is 6.6. Which of the following is true?",
        options: ["Water is acidic at 50°C", "Kw is larger at 50°C than at 25°C", "pOH at 50°C is 7.4", "Both B and C"],
        correct: "Both B and C",
        hint: "Kw increases with temperature. pH + pOH = pKw. If pH = 6.6, then pOH = pKw - 6.6. Since Kw = 10⁻¹³.² at 50°C, pKw = 13.2, pOH = 6.6, so water is neutral.",
        unit: "Unit 8: Autoionization of Water"
    },

    // ==================== UNIT 9: Applications of Thermodynamics ====================
    {
        type: "sa",
        text: "Calculate ΔG° for the reaction: 2H₂(g) + O₂(g) → 2H₂O(l) at 298 K using ΔG°f values. (ΔG°f H₂O(l) = -237.2 kJ/mol)",
        correctAnswer: "ΔG° = ΣΔG°f(products) - ΣΔG°f(reactants) = [2 × (-237.2)] - [2(0) + 1(0)] = -474.4 kJ. The reaction is thermodynamically favored (ΔG° < 0).",
        hint: "ΔG°f for elements in standard state is zero.",
        unit: "Unit 9: Gibbs Free Energy",
        disclaimer: "Show the formula. Substitute values. Interpret the sign of ΔG°."
    },
    {
        type: "mc",
        text: "A galvanic cell has a standard cell potential of +1.10 V. What is ΔG° for the reaction? (n = 2, F = 96,500 C/mol)",
        options: ["-212 kJ", "+212 kJ", "-106 kJ", "+106 kJ"],
        correct: "-212 kJ",
        hint: "ΔG° = -nFE° = -2 × 96,500 × 1.10 = -212,300 J = -212 kJ.",
        unit: "Unit 9: Cell Potential & Free Energy"
    },
    {
        type: "fr",
        text: "A concentration cell is constructed with two Ni electrodes in Ni²⁺ solutions of 0.010 M and 1.00 M. Calculate the cell potential at 298 K. Which electrode is the anode?",
        correctAnswer: "Ecell = E° - (RT/nF)ln(Q) = 0 - (0.0592/2)log(0.010/1.00) = 0 - 0.0296 × log(0.01) = 0 - 0.0296 × (-2) = +0.0592 V. The anode is the electrode in the dilute solution (0.010 M) where oxidation occurs.",
        hint: "In concentration cells, E° = 0. Use Nernst equation. Anode has lower concentration.",
        unit: "Unit 9: Electrochemistry",
        disclaimer: "Use the Nernst equation. Show the calculation. Explain which electrode is the anode and why."
    },
    {
        type: "sa",
        text: "A current of 0.452 A is passed through molten CaCl₂ for 1.50 hours. Calculate the mass of calcium metal produced at the cathode. (F = 96,500 C/mol, Ca = 40.08 g/mol)",
        correctAnswer: "q = I × t = 0.452 A × (1.50 × 60 × 60 s) = 0.452 × 5400 = 2440.8 C. Moles e⁻ = q/F = 2440.8/96,500 = 0.0253 mol. Ca²⁺ + 2e⁻ → Ca, so moles Ca = 0.0253/2 = 0.01265 mol. Mass Ca = 0.01265 × 40.08 = 0.507 g.",
        hint: "Calculate charge (q = I×t), convert to moles of electrons, use stoichiometry.",
        unit: "Unit 9: Electrolysis & Faraday's Law",
        disclaimer: "Show all steps: calculate charge, moles of electrons, moles of Ca, then mass of Ca. Include units."
    },
    {
        type: "sa",
        text: "For the reaction Cu₂S(s) + O₂(g) → 2Cu(s) + SO₂(g), calculate ΔG° using the following: Cu₂S(s) → 2Cu(s) + S(s) ΔG° = +86.2 kJ, S(s) + O₂(g) → SO₂(g) ΔG° = -300.4 kJ.",
        correctAnswer: "Overall ΔG° = ΔG°₁ + ΔG°₂ = (+86.2) + (-300.4) = -214.2 kJ. The reaction is thermodynamically favored.",
        hint: "Add the reactions together; the ΔG° values add directly.",
        unit: "Unit 9: Coupled Reactions",
        disclaimer: "Add the two reactions. Show the ΔG° addition. Interpret the result."
    },
    {
        type: "fr",
        text: "Calculate the standard entropy change for the reaction: 2Al(s) + Fe₂O₃(s) → 2Fe(s) + Al₂O₃(s). Given: S° Al(s) = 28.0 J/mol·K, S° Fe₂O₃(s) = 87.0 J/mol·K, S° Fe(s) = 27.0 J/mol·K, S° Al₂O₃(s) = 51.0 J/mol·K. Predict the sign of ΔG° at 298 K if ΔH° = -852 kJ.",
        correctAnswer: "ΔS° = ΣS°(products) - ΣS°(reactants) = [2(27.0) + 51.0] - [2(28.0) + 87.0] = [54.0 + 51.0] - [56.0 + 87.0] = 105.0 - 143.0 = -38.0 J/K. ΔG° = ΔH° - TΔS° = -852 kJ - (298 K × -0.038 kJ/K) = -852 kJ + 11.3 kJ = -840.7 kJ. ΔG° is negative, so reaction is thermodynamically favored.",
        hint: "ΔS° = ΣS°(products) - ΣS°(reactants). Then use ΔG° = ΔH° - TΔS°.",
        unit: "Unit 9: Entropy & Gibbs Free Energy",
        disclaimer: "Calculate ΔS°. Then use ΔG° = ΔH° - TΔS°. Interpret whether the reaction is thermodynamically favored."
    }
];

// Single topic for Pre-Test
const TOPICS = {
    pretest: {
        name: "AP Chemistry Comprehensive Pre-Test",
        icon: "fas fa-flask",
        order: 0,
        questions: PRETEST_QUESTIONS.map(q => randomizeQuestion(q))
    }
};

const TOPIC_ORDER = ['pretest'];

// Randomize questions when the app loads
function randomizeAllQuestions() {
    for (let topic in TOPICS) {
        TOPICS[topic].questions = TOPICS[topic].questions.map(q => randomizeQuestion(q));
    }
}

// Call this when initializing the game
if (typeof randomizeAllQuestions === 'function') {
    randomizeAllQuestions();
}