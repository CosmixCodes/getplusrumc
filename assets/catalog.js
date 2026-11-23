/* JavaScript, catalog.js, modern browsers, GETPLUS course and book catalog */
globalThis.GETPLUS_CATALOG = [
  {
    id: "bangla", name: "Bangla", native: "বাংলা", track: "Reading & expression",
    color: "rose", art: "bangla.webp", source: "/student/subjects/106",
    description: "Build a close reading of poetry and prose, then write answers with a clear argument and evidence.",
    sections: [
      { name: "Bangla First Paper", url: "/student/chapters/106/15", chapters: [
        ["কবি পরিচিতি", "/student/class/106/15/730"], ["কবিতা", "/student/class/106/15/118"],
        ["গদ্য", "/student/class/106/15/117"], ["FRC solve class", "/student/class/106/15/739"]
      ]},
      { name: "Bangla Second Paper", url: "/student/chapters/106/16" },
      { name: "First Paper archive", url: "/student/chapters/106/90" },
      { name: "Second Paper archive", url: "/student/chapters/106/91" },
      { name: "Orientation", url: "/student/chapters/106/97" }
    ],
    lessons: [
      {
        id: "read-poetry", title: "Read a poem in three passes", video: "bangla-poetry.mp4",
        summary: "Move from the literal scene to an interpretation you can support.",
        steps: ["First pass. Identify the speaker, the scene and what changes.", "Second pass. Underline a striking image or repeated sound. Describe its effect in your own words.", "Third pass. State an interpretation and link it to one exact phrase. Explain the connection."],
        example: "A speaker describes an empty courtyard twice. If the poem first presents a gathering and ends there alone, the repeated image can mark the change from belonging to isolation.",
        question: "What makes an interpretation defensible?",
        choices: ["The poet’s name appears in the answer.", "A specific word or image supports the claim.", "The answer retells each line in order."], answer: 1
      },
      {
        id: "read-prose", title: "Find the turning point in prose", video: "bangla-prose.mp4",
        summary: "Separate what happens from what a choice reveals about a character.",
        steps: ["Summarize the scene’s situation in one sentence.", "Find the decision that changes what can happen next.", "Compare the character’s words with their action. Explain what the difference reveals."],
        example: "A character says they are leaving but returns a borrowed book before doing so. The action can reveal care that the dialogue conceals.",
        question: "Which detail is the strongest evidence of a turning point?",
        choices: ["A description of the sky.", "A list of character names.", "A decision that changes the available choices."], answer: 2
      },
      {
        id: "write-response", title: "Build a claim, evidence and explanation", video: "bangla-writing.mp4",
        summary: "Shape one exam-ready paragraph around a single point.",
        steps: ["Answer the prompt with one specific claim.", "Supply a short quotation or a precise event from the text.", "Explain how that detail supports the claim, then link the paragraph back to the question."],
        example: "For a question about responsibility, name the choice that reveals it, use the scene as evidence, and explain who is affected by the choice.",
        question: "What should follow a quotation?",
        choices: ["An explanation linking it to your claim.", "An unrelated plot summary.", "A second quotation with no explanation."], answer: 0
      }
    ]
  },
  {
    id: "ict", name: "ICT", native: "আইসিটি", track: "Computing fundamentals",
    color: "mint", art: "ict.webp", source: "/student/subjects/107",
    description: "Practice number systems, algorithms and database thinking with compact worked examples.",
    sections: [
      { name: "ICT chapters", url: "/student/chapters/107/19", chapters: [
        ["Chapter 1", "/student/class/107/19/132"], ["Chapter 2", "/student/class/107/19/133"],
        ["Chapter 3", "/student/class/107/19/134"], ["Chapter 4", "/student/class/107/19/135"],
        ["Chapter 5", "/student/class/107/19/136"], ["Chapter 6", "/student/class/107/19/137"],
        ["MCQ solve class", "/student/class/107/19/745"], ["CQ solve class", "/student/class/107/19/746"],
        ["Chapter 3.2", "/student/class/107/19/260"]
      ]},
      { name: "ICT archive", url: "/student/chapters/107/94" }
    ],
    lessons: [
      {
        id: "binary", title: "Convert binary to decimal", video: "ict-binary.mp4",
        summary: "Read place values from right to left and add the weights of the set bits.",
        steps: ["Start at the rightmost digit with weight 1.", "Double the weight at each position as you move left.", "Add only the weights where the digit is 1."],
        example: "10110₂ equals 16 + 4 + 2, so the decimal value is 22.",
        question: "What is the decimal value of 1101₂?",
        choices: ["11", "13", "15"], answer: 1
      },
      {
        id: "algorithms", title: "Trace an algorithm by hand", video: "ict-algorithms.mp4",
        summary: "Track changing values in a table and test the cases that reach each branch.",
        steps: ["List the inputs and starting values.", "Make one row for each assignment or loop iteration.", "Try a boundary input and confirm which branch executes."],
        example: "With a running total starting at 0, processing 2, 4 and 6 yields totals of 2, 6 and 12 in successive rows.",
        question: "Which input best tests a branch written as score ≥ 40?",
        choices: ["Only 100", "Only 0", "Scores of 39 and 40"], answer: 2
      },
      {
        id: "database-keys", title: "Choose a primary key", video: "ict-database.mp4",
        summary: "Identify rows with a stable, unique value.",
        steps: ["List the columns that could identify a row.", "Reject any column whose value can repeat or be missing.", "Prefer a stable identifier. Reference it from related tables using a foreign key."],
        example: "Two students can share a name. A school-issued student ID can uniquely identify each row in the student table.",
        question: "Which value is a good key for a student table?",
        choices: ["A unique student ID", "A first name", "An exam subject"], answer: 0
      }
    ]
  },
  {
    id: "english", name: "English", native: "ইংরেজি", track: "Language & comprehension",
    color: "blue", art: "english.webp", source: "/student/subjects/108",
    description: "Read for meaning, make accurate inferences and answer in concise, evidence-based English.",
    sections: [
      { name: "English First Paper", url: "/student/chapters/108/17", chapters: [
        ["FRC class", "/student/class/108/17/741"], ["Flow chart", "/student/class/108/17/257"],
        ["Unit 9", "/student/class/108/17/128"], ["Unit 8", "/student/class/108/17/127"],
        ["Unit 1", "/student/class/108/17/120"], ["Unit 2", "/student/class/108/17/121"],
        ["Unit 3", "/student/class/108/17/122"], ["Unit 4", "/student/class/108/17/123"]
      ]},
      { name: "English Second Paper", url: "/student/chapters/108/18" },
      { name: "Orientation", url: "/student/chapters/108/97" }
    ],
    lessons: [
      {
        id: "main-idea", title: "Find the main idea in a passage", video: "english-main-idea.mp4",
        summary: "Separate the subject from the author’s main point about it.",
        steps: ["Identify the topic in a few words.", "Ask what the author wants you to understand about that topic.", "Test your sentence against the whole paragraph. A single example rarely covers the main idea."],
        example: "In a passage about a school garden, tomatoes and spinach may be examples. The main idea could be that maintaining the garden teaches cooperation.",
        question: "Which answer usually states the main idea?",
        choices: ["One statistic from the second sentence.", "The point that explains most supporting details.", "The first unfamiliar word in the passage."], answer: 1
      },
      {
        id: "flow-chart", title: "Turn a passage into a flow chart", video: "english-flow.mp4",
        summary: "Extract the changes or actions that belong in each step.",
        steps: ["Locate the starting point described in the question.", "Mark the next actions or events in their logical order.", "Rewrite each one as a short phrase with a consistent grammatical form."],
        example: "From a story about a school project, use parallel phrases such as choosing a topic, collecting examples and presenting findings.",
        question: "Which set uses a consistent form?",
        choices: ["Select a topic, gathering notes, the presentation.", "Topic selected, they gathered notes, and presentation.", "Choosing a topic, gathering notes, presenting findings."], answer: 2
      },
      {
        id: "sentence-edit", title: "Edit one accurate sentence", video: "english-editing.mp4",
        summary: "Check the verb against its subject and its time reference.",
        steps: ["Find the main verb and the subject that controls it.", "Check whether the subject is singular or plural.", "Find the time cue and match the tense to it. Read the sentence aloud once."],
        example: "In ‘The list of topics is ready’, the main subject is ‘list’. The intervening phrase ‘of topics’ does not change the verb.",
        question: "Which sentence agrees with its subject?",
        choices: ["The set of questions is ready.", "The set of questions are ready.", "The set of questions were ready now."], answer: 0
      }
    ]
  }
];
