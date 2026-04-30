export const SEMESTERS = [
  { id: 'sem-1', label: 'Semester 1', subtitle: 'B.Sc. (H) Quantum Technology foundation courses' },
];

export const THEORY_CONTENT = {
  'sem-1': [
    {
      subject: 'Python Programming and Algorithms – I',
      meta: {
        programme: 'B.Sc. (H) in Quantum Technology',
        semester: 'I',
        credits: 3,
        hours: 45,
        type: 'Multidisciplinary - MD (Theory)',
        prerequisites: 'Basic computer literacy (Class XII level)',
      },
      objectives: [
        'Introduce students to basic programming concepts using Python.',
        'Develop problem-solving skills through simple algorithms.',
        'Familiarize students with writing, testing, and debugging basic Python programs.',
        'Prepare students for advanced programming and computational courses.',
      ],
      chapters: [
        { title: 'Unit I: Introduction to Python Programming', details: 'Programming basics, Python features, installation, interpreter, variables and data types, input/output, arithmetic/relational/logical operators.', applications: 'Simple calculations, user input programs, basic scientific computations.', notesPdf: '/pdfs/Unit1_Python_Notes.pdf' },
        { title: 'Unit II: Control Statements and Basic Problem Solving', details: 'if/if-else/if-elif-else, nested conditions, for/while loops, break, continue, flowcharts, introductory algorithms.', applications: 'Even/odd checking, factorial, and simple decision-making programs.', notesPdf: '/pdfs/Unit2_Python_Notes.pdf' },
        { title: 'Unit III: Functions, Lists, and Basic Algorithms', details: 'Functions, arguments, return values, lists and methods, and algorithms for sum/average/maximum/minimum.', applications: 'Data processing, list-based calculations, and modular programming.' },
      ],
      outcomes: [
        'Understand basic programming concepts and Python syntax.',
        'Write simple Python programs with variables, conditions, loops, and functions.',
        'Apply basic algorithms to solve elementary computational problems.',
      ],
      books: [
        'Reema Thareja, Python Programming: Using Problem Solving Approach, Oxford University Press.',
        'John V. Guttag, Introduction to Computation and Programming Using Python, MIT Press.',
        "Allen B. Downey, Think Python, O'Reilly Publications.",
      ],
    },
    {
      subject: 'Mathematics for AI and Quantum Systems – I',
      meta: {
        programme: 'B.Sc. (H) in Quantum Technology',
        semester: 'I',
        credits: 4,
        hours: 60,
        type: 'Major (Theory)',
        prerequisites: 'Class XII Mathematics (basic algebra and calculus)',
      },
      objectives: [
        'Develop essential mathematical skills for AI and Quantum Systems.',
        'Build intuition for vectors, matrices, calculus, and probability.',
        'Prepare students for higher-level AI and quantum courses.',
      ],
      chapters: [
        { title: 'Unit I: Functions and Mathematical Foundations', details: 'Sets, functions, linear/polynomial/exponential/logarithmic functions, graph transformations, limits and continuity.', applications: 'Activation functions and growth models in AI.' },
        { title: 'Unit II: Linear Algebra for AI and Quantum Systems', details: 'Scalars, vectors, matrices, matrix operations, systems of equations, intro to vector spaces.', applications: 'Feature vectors, data representation, and introductory quantum states.' },
        { title: 'Unit III: Calculus and Optimization', details: 'Derivatives, partial derivatives, gradient, optimization, maxima and minima.', applications: 'Gradient descent and optimization in learning algorithms.' },
        { title: 'Unit IV: Probability, Statistics, and Mathematical Tools', details: 'Probability basics, random variables, expectation, variance, distributions, complex numbers, inner products.', applications: 'Uncertainty in AI, probabilistic models, and quantum measurement intuition.' },
      ],
      outcomes: [
        'Apply fundamental mathematics to AI and Quantum Systems problems.',
        'Interpret mathematical formulations in machine learning and quantum computing.',
        'Demonstrate readiness for advanced mathematics courses.',
      ],
      books: [
        'Gilbert Strang, Introduction to Linear Algebra, Wellesley-Cambridge Press.',
        'Thomas and Finney, Calculus, Pearson Education.',
        'Sheldon Ross, A First Course in Probability, Pearson Education.',
      ],
    },
    {
      subject: 'Mechanics',
      meta: {
        programme: 'B.Sc. (H) in Quantum Technology',
        semester: 'I',
        credits: 4,
        hours: 60,
        type: 'Major (Theory)',
        prerequisites: 'Class XII Physics and Mathematics',
      },
      objectives: [
        'Understand basic concepts of motion and forces.',
        'Develop problem-solving skills in classical mechanics.',
        'Build a foundation for advanced physics and quantum studies.',
        'Relate physical laws to real-world situations.',
      ],
      chapters: [
        { title: 'Unit I: Motion in One and Two Dimensions', details: 'Distance, displacement, velocity, acceleration, equations of motion, projectile motion, motion graphs.', applications: 'Vehicles, falling objects, and sports motion.' },
        { title: 'Unit II: Laws of Motion and Forces', details: "Newton's laws, friction/tension/normal force, free body diagrams, circular motion.", applications: 'Vehicle dynamics and planetary motion.' },
        { title: 'Unit III: Work, Energy, and Power', details: 'Work done, kinetic/potential energy, work-energy theorem, conservation of energy, power and efficiency.', applications: 'Machines, engines, and energy systems.' },
        { title: 'Unit IV: Rotational Motion and Gravitation', details: 'Torque, angular momentum, moment of inertia, gravitation, motion of planets and satellites.', applications: 'Satellites and rotating systems.' },
      ],
      outcomes: [
        'Understand and explain laws of motion and forces.',
        'Apply concepts of work and energy to simple problems.',
        'Describe rotational motion and gravitational systems.',
      ],
      books: [
        'H.C. Verma, Concepts of Physics (Vol. 1).',
        'D. Halliday, R. Resnick and J. Walker, Fundamentals of Physics.',
        'N.C.E.R.T. Physics.',
      ],
    },
  ],
};

export const PRACTICAL_CONTENT = {
  'sem-1': [
    {
      subject: 'Python Programming – I Practical',
      meta: { credits: 1, hours: 30, type: 'Major (Practical)' },
      objectives: [
        'Provide hands-on experience in Python programming.',
        'Develop logical thinking through practical problem-solving.',
        'Enable students to write, execute, and debug simple Python programs.',
        'Build foundational skills for scientific and computational applications.',
      ],
      experiments: [
        'Install Python and get familiar with IDLE/Anaconda/Jupyter.',
        'Display simple text messages.',
        'Perform arithmetic operations.',
        'Find areas of circle/rectangle/triangle.',
        'Swap two variables.',
        'Check even/odd.',
        'Find largest of two and three numbers.',
        'Check positive/negative/zero.',
        'Find factorial using loop.',
        'Print multiplication table.',
        'Find sum of first N natural numbers.',
        'Use functions for square and cube.',
        'Find maximum of three using function.',
        'Create a list and display elements.',
        'Find sum and average in a list.',
        'Find max/min in a list.',
        'Count elements in a list.',
      ],
      outcomes: [
        'Write and execute basic Python programs.',
        'Implement simple algorithms using control statements and functions.',
        'Use lists and basic data structures in Python.',
      ],
    },
    {
      subject: 'Mathematics for AI and Quantum Systems – I Practical',
      meta: { credits: 2, hours: 60, type: 'Major (Practical)' },
      experiments: [
        { title: 'Plot linear, polynomial, exponential, and logarithmic functions.', path: '/function-plotter' },
        'Visualize graph transformations.',
        'Explore limits and continuity.',
        'Visualize AI activation functions.',
        'Represent vectors and matrices.',
        'Perform matrix operations and solve linear equations.',
        'Compute derivatives and understand slopes graphically.',
        'Explore partial derivatives and simple optimization.',
        'Understand gradient descent basics.',
        'Solve basic probability problems.',
        'Compute mean, variance, and standard deviation.',
        'Run simple simulations.',
        'Intro to complex numbers and data visualization.',
      ],
      outcomes: [
        'Use mathematical tools for computation and visualization.',
        'Solve simple problems related to AI and quantum systems.',
        'Interpret and explain computational results.',
      ],
    },
    {
      subject: 'Mechanics Practical',
      meta: { credits: 1, hours: 30, type: 'Major (Practical)' },
      experiments: [
        { title: 'Measure length with vernier caliper and least count.', path: '/vernier-caliper' },
        { title: 'Measure wire diameter with screw gauge.', path: '/screw-gauge' },
        { title: 'Determine volume and density of an object.', path: '/volume-density' },
        { title: 'Study errors and significant figures.', path: '/errors-and-sig-figs' },
        { title: 'Study pendulum motion.', path: '/pendulum' },
        { title: 'Determine acceleration due to gravity using pendulum.', path: '/pendulum-gravity' },
        { title: 'Verify equations of motion using graph method.', path: '/motion-equations' },
        {
          id: 7,
          title: "Verification of Hooke's Law and determination of spring constant.",
          slug: "hookes-law",
          path: "/hookes-law"
        },
        {
          id: 8,
          title: 'Study of conservation of mechanical energy.',
          slug: 'energy-conservation',
          path: '/energy-conservation'
        },
        'Determine moment of inertia of a flywheel.',
        'Study friction on surfaces.',
        'Determine coefficient of friction using inclined plane.',
      ],
      outcomes: [
        'Perform accurate measurements with standard instruments.',
        'Verify fundamental mechanics laws experimentally.',
        'Analyze results with proper error estimation.',
      ],
    },
  ],
};
