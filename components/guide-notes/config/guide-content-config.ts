import { GuideContent } from "../types/guide-types"

export const guideContentConfig: Record<string, GuideContent> = {
    'teaching': {
        category: 'teaching',
        categoryLabel: 'Teaching Staff',
        section1A: {},
        section1B: {},
        section2: {
            rows: [
                {
                    keyResultArea: "1. Teaching & Instructional Effectiveness",
                    targets: `- Develop and submit detailed lesson plans for [Course Code] that explicitly incorporate at least [Number] active learning strategies (e.g., think-pair-share, project-based learning, peer teaching) and show differentiation for varied learner abilities by [Date].
- Successfully demonstrate these strategies during the scheduled lesson observation, achieving a rating of at least [3/5] on the "Use of Active Learning" criterion.
- Utilize [Specific Technology/Tool, e.g., LMS quizzes, simulation software] to enhance engagement and provide timely feedback.`,
                    resourcesRequired: "Lesson plan template, Observation feedback form, Access to LMS & educational technology, Teaching aids."
                },
                {
                    keyResultArea: "2. Industry Alignment, Practice & Student Project Supervision",
                    targets: `- Participate in a minimum of [Number] days of formal industry immersion (e.g., internship, shadowing, industry workshop) and submit a reflective report on insights gained by [Date].
- Supervise [Number] student hands-on projects (e.g., capstone projects, prototypes, service commissions) ensuring they solve real-world industry problems.
- Integrate a minimum of [Number] industry case studies, guest speakers, or live briefs from [Industry Partner] into course [Course Code].
- Ensure 100% of supervised student projects are assessed against industry-standard rubrics that include criteria for practicality, innovation, and safety.`,
                    resourcesRequired: "Industry partnership contacts, Budget for industry visits, Project materials budget, Industry-standard assessment rubrics, Workshop/Lab access."
                },
                {
                    keyResultArea: "3. Student Mentorship, Support & Assessment",
                    targets: `- Conduct academic advising for all assigned students ([Number]) each semester, documenting key outcomes.
- Provide written, constructive feedback on assignments within [5] working days of submission.
- Proactively identify and support at least [Number] at-risk students per semester through individualized learning plans.`,
                    resourcesRequired: "Student records system, Collaboration with Guidance & Counselling, Learning plan templates."
                },
                {
                    keyResultArea: "4. Institutional Contribution & Service",
                    targets: `- Actively serve on the [e.g., Examinations Committee / Safety Committee] and contribute to [2] key decisions/initiatives.
- Participate in the planning/execution of at least [2] institutional events (e.g., Open Day, Career Fair).
- Mentor [Number] new junior staff members or teaching assistants.`,
                    resourcesRequired: "Clear committee roles, Budgetary support, Mentorship guidelines."
                },
                {
                    keyResultArea: "5. Professional Development & Technical Competence",
                    targets: `- Attend at least [3] relevant professional development workshops (pedagogical or technical).
- Obtain/update certification in [Specific Technical Skill, e.g., CNC Programming].
- Present a workshop or seminar on [a new skill learned] to colleagues.`,
                    resourcesRequired: "Training budget, Access to certification bodies, Platform for knowledge sharing."
                }
            ]
        },
        section3: {
            targets: [
                {
                    no: "1",
                    item: "Teaching & Instructional Effectiveness",
                    progressReview: "[e.g., Lesson plans for Semester 1 submitted, showing good use of group work. First observation rated 4/5 for active learning.]",
                    remarks: "[e.g., Focus on incorporating more technology in H2.]"
                },
                {
                    no: "2",
                    item: "Industry Alignment, Practice & Student Project Supervision",
                    progressReview: "[e.g., 2-day industry visit completed. Student projects initiated; proposals approved. One guest speaker hosted.]",
                    remarks: "[e.g., Plan second industry immersion for Q4. Monitor project progress closely.]"
                }
            ],
            competencies: [
                {
                    no: "1",
                    item: "Pedagogical & Technical Expertise",
                    progressReview: "[e.g., Strong lesson planning. Technical skills up-to-date.]",
                    remarks: "1"
                },
                {
                    no: "2",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "2"
                }
            ]
        },
        section4: {
            rows: [
                {
                    no: "1",
                    target: "Teaching & Instructional Effectiveness",
                    performanceAssessment: "",
                    weightOfTarget: "",
                    score: "",
                    comments: "[e.g., Exceeded expectations. Lesson plans were exemplary. Observations showed exceptional use of active learning and differentiation.]"
                },
                {
                    no: "2",
                    target: "Industry Alignment, Practice & Student Project Supervision",
                    performanceAssessment: "",
                    weightOfTarget: "",
                    score: "",
                    comments: "[e.g., All targets met. Student projects were highly innovative and industry-relevant. Strong immersion report submitted.]"
                }
            ]
        },
        section5: {
            coreCompetencies: [
                {
                    no: "1",
                    competency: "Pedagogical & Technical Expertise: Depth of subject knowledge; skill in designing lessons with active learning & differentiation; technical proficiency.",
                    weight: "",
                    score: "",
                    calculation: "",
                    comments: "Comment on lesson plan quality, use of varied teaching strategies, and ability to tailor instruction as seen in observations."
                },
                {
                    no: "2",
                    competency: "Industry Application & Practice: Ability to integrate current industry trends, supervise authentic projects, and facilitate meaningful industry immersion.",
                    weight: "",
                    score: "",
                    calculation: "",
                    comments: "Comment on the relevance of student projects, quality of industry linkages, and application of practical skills."
                }
            ],
            nonCoreCompetencies: [
                {
                    competency: "Commitment to Own Personal Development and Training: Eagerness for self-development, seeking new skills.",
                    weight: "",
                    score: "",
                    calculation: "",
                    comments: "[e.g., Exceeded training targets and applied learning effectively.]"
                },
                {
                    competency: "Respect and Commitment: Respect for all, commitment to work and organisational development.",
                    weight: "",
                    score: "",
                    calculation: "",
                    comments: "[e.g., A role model for institutional values.]"
                }
            ]
        },
        section6: {
            exampleComment: `"[Staff Name] has demonstrated exceptional growth in instructional design. Their lesson plan for [Specific Unit] effectively used differentiated group roles and a hands-on simulation, which was confirmed during my lesson observation on [Date]. In Industry Alignment, they excelled by supervising four student teams in developing a functional [Project Type] for a local auto workshop, providing an invaluable real-world experience. Their industry immersion at [Company Name] directly informed updates to our practical assessment criteria."`
        },
        section7: {
            examplePlan: `•\tPedagogical Skill: Attend workshop on "Advanced Differentiation Strategies in TVET" to build on current strengths.
•\tIndustry Connection: Pursue a short-term industry attachment with [Specific Company] to deepen knowledge of [Specific Technology/Process].
•\tProject Supervision: Formal training in "Project Management for Student-Led Initiatives" to enhance supervision skills.`
        },
        section8: {}
    },
    'headquarters-technical': {
        category: 'headquarters-technical',
        categoryLabel: 'Headquarters & Regional Office Technical Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
    'accounting': {
        category: 'accounting',
        categoryLabel: 'Accounting Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
    'catering': {
        category: 'catering',
        categoryLabel: 'Catering Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
    'corporate-affairs': {
        category: 'corporate-affairs',
        categoryLabel: 'Corporate Affairs Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
    'general-admin': {
        category: 'general-admin',
        categoryLabel: 'General Administrative Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
    'human-resource': {
        category: 'human-resource',
        categoryLabel: 'Human Resource Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
    'procurement': {
        category: 'procurement',
        categoryLabel: 'Procurement Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
    'audit': {
        category: 'audit',
        categoryLabel: 'Audit Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
    'security-drivers-laborers': {
        category: 'security-drivers-laborers',
        categoryLabel: 'Security, Drivers, Janitors & General Labourers',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
    'admin-support': {
        category: 'admin-support',
        categoryLabel: 'Administrative Support Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] },
        section4: { rows: [] },
        section5: { coreCompetencies: [], nonCoreCompetencies: [] },
        section6: { exampleComment: "" },
        section7: { examplePlan: "" },
        section8: {}
    },
}
