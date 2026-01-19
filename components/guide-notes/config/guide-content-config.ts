import { GuideContent } from "../types/guide-types"

export const guideContentConfig: Record<string, GuideContent> = {
    'principal-of-tvet': {
        category: 'principal',
        categoryLabel: 'Principal of TVET',
        section1A: {},
        section1B: {},
        section2: {
            rows: [
                {
                    keyResultArea: "1. Strategic Leadership & Institutional Governance",
                    targets: `- Develop and implement the annual institutional operational plan aligned with Ghana TVET Service strategy by [31st March].
- Achieve at least [90%] implementation of key annual plan activities.
- Ensure 100% compliance with TVET policies, accreditation standards, and regulatory requirements.
- Convene and chair [4] Governing Council/Board meetings with documented decisions and action plans.
`,
                    resourcesRequired: "Strategic plan documents, Policy guidelines, Board/committee support, Meeting facilities"
                },
                {
                    keyResultArea: "2. Academic Excellence & Quality Assurance",
                    targets: `- Achieve a pass rate of at least [85%] in national competency-based assessments across all programmes.
- Implement [3] quality improvement initiatives based on internal audit and external review findings.
- Ensure [100%] of teaching staff undergo annual pedagogical training.
- Increase student enrollment in priority trades by [10%].
`,
                    resourcesRequired: "Assessment reports, QA frameworks, Training budget, Marketing materials"
                },
                {
                    keyResultArea: "3. Financial Sustainability & Resource Management",
                    targets: `- Manage institutional budget within approved limits, with less than [5%] variance.
- Secure at least [2] new sources of funding or partnerships (industry, donors, projects).
- Ensure optimal utilization and maintenance of institutional assets (workshops, labs, equipment) with less than [10%] downtime.
- Submit quarterly financial reports to headquarters by the [10th] of following month.
`,
                    resourcesRequired: "Budget templates, Partnership proposals, Asset register, Maintenance contracts"
                },
                {
                    keyResultArea: "4. Stakeholder Engagement & Community Linkages",
                    targets: `- Establish/strengthen partnerships with at least [5] key industry players for internships, curriculum input, and job placements.
- Achieve [85%] satisfaction rate from employers regarding graduate performance.
- Organize at least [2] community outreach programs or open days.
- Maintain effective communication with Parent-Teacher Association and Student Representative Council.
`,
                    resourcesRequired: "Industry database, MOU templates, Event planning support, Communication platforms"
                },
                {
                    keyResultArea: "5. Staff Development & Institutional Culture",
                    targets: `- Ensure [100%] of staff complete annual performance appraisals by [31st December].
- Implement at least [2] staff welfare or motivation initiatives.
- Maintain a staff retention rate of at least [90%].
- Foster a culture of innovation, with at least [3] staff-led improvement initiatives documented.
`,
                    resourcesRequired: "HR policies, Staff survey tools, Development budget, Recognition schemes"
                }
            ]
        },
        section3: {
            targets: [
                {
                    no: "1",
                    item: "Strategic Leadership & Institutional Governance",
                    progressReview: "",
                    remarks: ""
                },
                {
                    no: "2",
                    item: "Academic Excellence & Quality Assurance",
                    progressReview: "",
                    remarks: ""
                },
                {
                    no: "3",
                    item: "Financial Sustainability & Resource Management",
                    progressReview: "",
                    remarks: ""
                },
                {
                    no: "4",
                    item: "Stakeholder Engagement & Community Linkages",
                    progressReview: "",
                    remarks: ""
                },
                {
                    no: "5",
                    item: "Staff Development & Institutional Culture",
                    progressReview: "",
                    remarks: ""
                },
            ],
            competencies: [
                {
                    no: "1",
                    item: "Strategic Vision & Governance",
                    progressReview: "",
                    remarks: ""
                },
                {
                    no: "2",
                    item: "Financial & Operational Acumen",
                    progressReview: "",
                    remarks: ""
                },
                {
                    no: "3",
                    item: "Stakeholder & Partnership Management",
                    progressReview: "",
                    remarks: ""
                },
            ]
        },
        section4: {
            rows: [
                {
                    no: "1",
                    target: "Strategic Leadership & Institutional Governance",
                    performanceAssessment: "",
                    weightOfTarget: "0.6",
                    score: "",
                    comments: ""
                },
                {
                    no: "2",
                    target: "Academic Excellence & Quality Assurance",
                    performanceAssessment: "",
                    weightOfTarget: "0.6",
                    score: "",
                    comments: ""
                },
                {
                    no: "3",
                    target: "Financial Sustainability & Resource Management",
                    performanceAssessment: "",
                    weightOfTarget: "0.6",
                    score: "",
                    comments: ""
                },
                {
                    no: "4",
                    target: "Stakeholder Engagement & Community Linkages",
                    performanceAssessment: "",
                    weightOfTarget: "0.6",
                    score: "",
                    comments: ""
                },
                {
                    no: "5",
                    target: "Staff Development & Institutional Culture",
                    performanceAssessment: "",
                    weightOfTarget: "0.6",
                    score: "",
                    comments: ""
                },
            ]
        },
        section5: {
            coreCompetencies: [
                {
                    no: "1",
                    competency: "Strategic Vision & Governance: Ability to develop and communicate a clear vision for the institution; effective governance and decision-making; alignment with national TVET strategy; foresight in anticipating trends and challenges.",
                    weight: "0.3",
                    score: "",
                    calculation: "",
                    comments: "Comment on clarity of institutional direction, quality of strategic planning, effectiveness of governance structures, and alignment with Ghana TVET Service objectives"
                },
                {
                    no: "2",
                    competency: "Financial & Operational Acumen: Sound financial management and budgeting skills; efficient resource allocation; asset management; understanding of procurement processes; operational efficiency.",
                    weight: "0.3",
                    score: "",
                    calculation: "",
                    comments: "Comment on budget management, resource utilization, cost-effectiveness, maintenance of facilities and equipment, and compliance with financial regulations."
                },
                {
                    no: "3",
                    competency: "Stakeholder & Partnership Management: Building and maintaining relationships with industry, community, government, and educational partners; effective negotiation; collaboration skills; public relations.",
                    weight: "0.3",
                    score: "",
                    calculation: "",
                    comments: "Comment on quality of industry linkages, community engagement, partnership development, and representation of the institution to external stakeholders."
                },
                {
                    no: "4",
                    competency: "Leadership & People Management: Inspiring and motivating staff; effective delegation; conflict resolution; staff development; creating positive organizational culture; change management.",
                    weight: "0.3",
                    score: "",
                    calculation: "",
                    comments: "Comment on staff morale, team building, handling of personnel issues, mentorship, and fostering of innovation and accountability."
                },
                {
                    no: "5",
                    competency: "5. Communication & Advocacy: Clear and persuasive communication with diverse audiences; effective reporting; advocacy for TVET; transparency in institutional communication.",
                    weight: "0.3",
                    score: "",
                    calculation: "",
                    comments: "Comment on clarity of communication, effectiveness in advocacy, quality of reports, and engagement with staff, students, and external parties."
                }
            ],
            nonCoreCompetencies: [
                {
                    competency: "Commitment to Personal Development: Eagerness for self-improvement; seeking new leadership skills; staying updated on educational trends.",
                    weight: "0.1",
                    score: "",
                    calculation: "",
                    comments: ""
                },
                {
                    competency: "Integrity & Ethical Leadership: Demonstrating honesty, fairness, and ethical behaviour; serving as role model; accountability; transparency.",
                    weight: "0.1",
                    score: "",
                    calculation: "",
                    comments: ""
                },
                {
                    competency: "Resilience & Adaptability: Handling pressure and setbacks; flexibility in changing circumstances; problem-solving under stress.",
                    weight: "0.1",
                    score: "",
                    calculation: "",
                    comments: ""
                },
                {
                    competency: "Service Orientation: Commitment to student success and staff welfare; responsiveness to stakeholders; dedication to TVET mission.",
                    weight: "0.1",
                    score: "",
                    calculation: "",
                    comments: ""
                }
            ]
        },
        section6: {
            exampleComment: `"Principal [Name] has demonstrated exemplary strategic leadership by successfully implementing [Specific Initiative] which increased student enrollment by [%]. Their financial management resulted in [Specific Achievement], and they have strengthened industry partnerships with [Company Names]. The institution's pass rates have improved from [%] to [%] under their leadership."`
        },
        section7: {
            examplePlan: `•\tAdvanced Leadership: Attend "Strategic Leadership in TVET" workshop to enhance change management skills.
•\tFinancial Management: Training on "Advanced Budgeting and Resource Mobilization" for public educational institutions.
•\tIndustry Engagement: Participation in industry forums to strengthen partnerships and stay updated on sector trends.`
        },
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            section10Title: "Director General’s Comments",
            section10Description: "[The DG provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]",
            signatureLabel: "DG'S SIGNATURE",
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'vice-principal-academic': {
        category: 'vice-principal-academic',
        categoryLabel: 'Vice Principal (Academic)',
        section1A: {},
        section1B: {},
        section2: {
            rows: [
                {
                    keyResultArea: "1. Curriculum Delivery & Academic Standards",
                    targets: `- Ensure [100%] of programmes are delivered as per approved curriculum and schedule.
- Achieve student satisfaction rate of at least [85%] on teaching quality through end-of-semester surveys.
- Implement [3] innovative teaching/learning initiatives (e.g., digital learning, project-based learning).
- Review and update [2] course curricula with industry input.
`,
                    resourcesRequired: "Curriculum documents, LMS, Teaching resources, Survey tools"
                },
                {
                    keyResultArea: "2. Student Performance & Assessment",
                    targets: `- Attain overall student pass rate of [85%] in internal and external assessments.
- Reduce student dropout rate by [5%] compared to previous year.
- Ensure timely and accurate processing of all student results and transcripts within [5] working days after exams.
- Implement [2] interventions for academically at-risk students.
`,
                    resourcesRequired: "Assessment tools, Student tracking system, Exam schedules, Tutorial support"
                },
                {
                    keyResultArea: "3. Teaching Staff Development & Supervision",
                    targets: `- Conduct at least [10] classroom/workshop observations per semester and provide constructive feedback.
- Ensure [100%] of teaching staff participate in relevant CPD programmes (minimum [20] hours annually).
- Facilitate the development of at least [5] new teaching aids or instructional materials.
- Mentor [3] new or junior teaching staff.
`,
                    resourcesRequired: "Observation forms, Training calendar, Resource budget, Mentorship guidelines."
                },
                {
                    keyResultArea: "4. Academic Quality Assurance & Accreditation",
                    targets: `- Conduct internal academic audits for [100%] departments annually with follow-up action plans.
- Ensure full compliance with CTVET/accreditation body requirements for all programmes.
- Implement [100%] of corrective actions from quality audit reports within stipulated timelines.
- Prepare institution for [1] accreditation/reaccreditation process.
`,
                    resourcesRequired: "QA manuals, Audit checklists, Accreditation guidelines, Documentation system."
                },
                {
                    keyResultArea: "5. Academic Partnerships & Industry Integration",
                    targets: `Coordinate at least [4] industry-led workshops or guest lectures per semester.
- Ensure [90%] of final year students participate in industry attachments/internships.
- Establish [2] new academic collaborations (MOUs, articulationagreements).
- Develop [1] joint research project with industry partner.
 `,
                    resourcesRequired: "Industry contacts, MOU templates, Internship logs, Research funding"
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            section10Title: "Regional Director’s Comments",
            section10Description: "[The Regional Director provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]",
            signatureLabel: "RD'S SIGNATURE",
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'vice-principal-administration': {
        category: 'vice-principal-administration',
        categoryLabel: 'Vice Principal (Administration)',
        section1A: {},
        section1B: {},
        section2: {
            rows: [
                {
                    keyResultArea: "1. Administrative Operations & Facilities Management",
                    targets: `- Ensure [95%] availability and functionality of key facilities (workshops, labs, offices).
- Oversee completion of [3] maintenance/renovation projects within budget and timeline.
- Achieve [85%] satisfaction rate from staff on administrative support services.
- Implement [1] digital administrative system to improve efficiency.
`,
                    resourcesRequired: "Maintenance schedules, Budget plans, Service contracts, IT support"
                },
                {
                    keyResultArea: "2. Financial Management & Procurement",
                    targets: `- Manage administrative budget with less than [5%] overspend.
- Ensure [100%] compliance with procurement regulations (PPA).
- Process all procurement requests within [10] working days.
- Achieve cost savings of [%] through efficient procurement practices.
`,
                    resourcesRequired: "Procurement guidelines, Budget reports, Vendor database, Price analysis tools"
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            section10Title: "Regional Director’s Comments",
            section10Description: "[The RD provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]",
            signatureLabel: "RD'S SIGNATURE",
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            section10Title: "Principal's Comments",
            section10Description: "•	[The Principal provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]",
            signatureLabel: "HOD'S SIGNATURE",
            exampleComment: `"•	[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'headquarters-technical': {
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            section10Title: "DG/DDG/RD’s Comments",
            section10Description: "[The DG/DDG/RD provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]",
            signatureLabel: "DG/DDG/RD'S SIGNATURE",
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'accounting': {
        category: 'accounting',
        categoryLabel: 'Accounting Staff',
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            section10Title: "Principal/ Regional Director /Head of Division's (HOD) Comments",
            section10Description: "[The Principal/ Regional Director/ HOD provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]",
            signatureLabel: "Principal/ Regional Director/ HOD'S SIGNATURE",
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'catering': {
        category: 'catering',
        categoryLabel: 'Catering Staff',
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            section10Title: "Principal/ Regional Director /Head of Division's (HOD) Comments",
            section10Description: "[The Principal/ Regional Director/ HOD provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]",
            signatureLabel: "Principal/ Regional Director/ HOD'S SIGNATURE",
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'corporate-affairs': {
        category: 'corporate-affairs',
        categoryLabel: 'Corporate Affairs Staff',
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            section10Title: "Principal/ Regional Director /Head of Division's (HOD) Comments",
            section10Description: "[The Principal/ Regional Director/ HOD provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]",
            signatureLabel: "Principal/ Regional Director/ HOD'S SIGNATURE",
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'general-admin': {
        category: 'general-admin',
        categoryLabel: 'General Administrative Staff',
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            section10Title: "Principal/ Regional Director /Head of Division's (HOD) Comments",
            section10Description: "[The Principal/ Regional Director/ HOD provides final endorsement, comments on the staff's potential, and confirms institutional support for the development plan.]",
            signatureLabel: "Principal/ Regional Director/ HOD'S SIGNATURE",
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'human-resource': {
        category: 'human-resource',
        categoryLabel: 'Human Resource Staff',
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'procurement': {
        category: 'procurement',
        categoryLabel: 'Procurement Staff',
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'audit': {
        category: 'audit',
        categoryLabel: 'Audit Staff',
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'security-drivers-laborers': {
        category: 'security-drivers-laborers',
        categoryLabel: 'Security Drivers & Laborers',
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    'admin-support': {
        category: 'audit',
        categoryLabel: 'Admin Support Staff',
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
                },
                {
                    no: "3",
                    item: "Student Mentorship & Support",
                    progressReview: "[e.g., All Semester 1 advising completed. Feedback turnaround time is being met.]",
                    remarks: "[e.g., Continue proactive monitoring of at-risk students.]"
                },
                {
                    no: "4",
                    item: "Institutional Contribution & Service",
                    progressReview: "[e.g., Active committee member. Participated in Open Day planning.]",
                    remarks: "[e.g., Good contribution.]"
                },
                {
                    no: "5",
                    item: "Professional Development",
                    progressReview: "[e.g., Attended one workshop on [Topic]. Certification process started.]",
                    remarks: "[e.g., Identify second workshop for H2.]"
                },
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
                },
                {
                    no: "3",
                    item: "Student Engagement & Project Supervision",
                    progressReview: "[e.g., Students are engaged in project work.]",
                    remarks: "3"
                },
                {
                    no: "4",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "4"
                },
                {
                    no: "5",
                    item: "Industry Application & Practice",
                    progressReview: "[e.g., Making good progress in building industry links.]",
                    remarks: "5"
                },
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
        section8: {},
        section9: {
            exampleComment: `"[e.g., I thank my appraiser for the constructive feedback. I agree with the assessment and am committed to working on the areas identified for development. I am particularly interested in the proposed training on [Training Topic] and look forward to contributing more to [Specific Area] in the coming year.]"`
        },
        section10: {
            exampleComment: `"[e.g., I have reviewed this appraisal and concur with the findings and recommendations. [Staff Name] is a valued member of the department, and we will support the proposed training plan.]"`
        }
    },
    // 'headquarters-technical': {
    //     category: 'headquarters-technical',
    //     categoryLabel: 'Headquarters & Regional Office Technical Staff',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },

    // 'accounting': {
    //     category: 'accounting',
    //     categoryLabel: 'Accounting Staff',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },

    // 'catering': {
    //     category: 'catering',
    //     categoryLabel: 'Catering Staff',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },

    // 'corporate-affairs': {
    //     category: 'corporate-affairs',
    //     categoryLabel: 'Corporate Affairs Staff',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },

    // 'general-admin': {
    //     category: 'general-admin',
    //     categoryLabel: 'General Administrative Staff',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },


    // 'human-resource': {
    //     category: 'human-resource',
    //     categoryLabel: 'Human Resource Staff',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },

    // 'procurement': {
    //     category: 'procurement',
    //     categoryLabel: 'Procurement Staff',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },

    // 'audit': {
    //     category: 'audit',
    //     categoryLabel: 'Audit Staff',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },

    // 'security-drivers-laborers': {
    //     category: 'security-drivers-laborers',
    //     categoryLabel: 'Security, Drivers, Janitors & General Labourers',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },

    // 'admin-support': {
    //     category: 'admin-support',
    //     categoryLabel: 'Administrative Support Staff',
    //     section1A: {},
    //     section1B: {},
    //     section2: { rows: [] },
    //     section3: { targets: [], competencies: [] },
    //     section4: { rows: [] },
    //     section5: { coreCompetencies: [], nonCoreCompetencies: [] },
    //     section6: { exampleComment: "" },
    //     section7: { examplePlan: "" },
    //     section8: {},
    //     section9: { exampleComment: "" },
    //     section10: { exampleComment: "" }
    // },
}
