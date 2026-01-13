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
        }
    },
    'headquarters-technical': {
        category: 'headquarters-technical',
        categoryLabel: 'Headquarters & Regional Office Technical Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
    'accounting': {
        category: 'accounting',
        categoryLabel: 'Accounting Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
    'catering': {
        category: 'catering',
        categoryLabel: 'Catering Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
    'corporate-affairs': {
        category: 'corporate-affairs',
        categoryLabel: 'Corporate Affairs Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
    'general-admin': {
        category: 'general-admin',
        categoryLabel: 'General Administrative Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
    'human-resource': {
        category: 'human-resource',
        categoryLabel: 'Human Resource Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
    'procurement': {
        category: 'procurement',
        categoryLabel: 'Procurement Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
    'audit': {
        category: 'audit',
        categoryLabel: 'Audit Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
    'security-drivers-laborers': {
        category: 'security-drivers-laborers',
        categoryLabel: 'Security, Drivers, Janitors & General Labourers',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
    'admin-support': {
        category: 'admin-support',
        categoryLabel: 'Administrative Support Staff',
        section1A: {},
        section1B: {},
        section2: { rows: [] },
        section3: { targets: [], competencies: [] }
    },
}
