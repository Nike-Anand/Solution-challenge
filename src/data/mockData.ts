export const HACKATHON_DATASET = [
  { id: 'APP-001', name: 'John Doe', gender: 'Male', race: 'White', age: 34, education: "Master's", experienceYears: 8, zipCode: '90210', initialScore: 88, aiDecision: 'Accepted' },
  { id: 'APP-002', name: 'Jane Smith', gender: 'Female', race: 'White', age: 32, education: "Master's", experienceYears: 7, zipCode: '90210', initialScore: 82, aiDecision: 'Rejected' },
  { id: 'APP-003', name: 'Michael Johnson', gender: 'Male', race: 'Black', age: 29, education: "Bachelor's", experienceYears: 5, zipCode: '10001', initialScore: 75, aiDecision: 'Rejected' },
  { id: 'APP-004', name: 'Emily Davis', gender: 'Female', race: 'Asian', age: 28, education: "Master's", experienceYears: 6, zipCode: '94105', initialScore: 79, aiDecision: 'Rejected' },
  { id: 'APP-005', name: 'William Brown', gender: 'Male', race: 'White', age: 41, education: "Bachelor's", experienceYears: 15, zipCode: '30301', initialScore: 91, aiDecision: 'Accepted' },
  { id: 'APP-006', name: 'Sarah Wilson', gender: 'Female', race: 'Hispanic', age: 35, education: 'PhD', experienceYears: 9, zipCode: '73301', initialScore: 86, aiDecision: 'Rejected' },
  { id: 'APP-007', name: 'David Miller', gender: 'Male', race: 'Asian', age: 26, education: "Master's", experienceYears: 3, zipCode: '98101', initialScore: 80, aiDecision: 'Accepted' },
  { id: 'APP-008', name: 'Jessica Taylor', gender: 'Female', race: 'White', age: 30, education: "Bachelor's", experienceYears: 6, zipCode: '60601', initialScore: 74, aiDecision: 'Rejected' },
  { id: 'APP-009', name: 'James Anderson', gender: 'Male', race: 'Black', age: 38, education: "Master's", experienceYears: 12, zipCode: '10027', initialScore: 89, aiDecision: 'Accepted' },
  { id: 'APP-010', name: 'Olivia Thomas', gender: 'Female', race: 'Black', age: 31, education: "Master's", experienceYears: 8, zipCode: '10027', initialScore: 84, aiDecision: 'Rejected' },
  { id: 'APP-011', name: 'Robert Jackson', gender: 'Male', race: 'Hispanic', age: 27, education: "Bachelor's", experienceYears: 4, zipCode: '33101', initialScore: 77, aiDecision: 'Accepted' },
  { id: 'APP-012', name: 'Sophia White', gender: 'Female', race: 'Asian', age: 45, education: 'PhD', experienceYears: 18, zipCode: '94110', initialScore: 92, aiDecision: 'Accepted' },
];

export const DEMOGRAPHIC_STATS = {
  gender: { Male: { applicants: 6, accepted: 5, acceptance_rate: 83 }, Female: { applicants: 6, accepted: 1, acceptance_rate: 16 } },
  race: { White: { applicants: 4, accepted: 2 }, Black: { applicants: 3, accepted: 1 }, Asian: { applicants: 3, accepted: 2 }, Hispanic: { applicants: 2, accepted: 1 } }
};

export const CORRELATION_MATRIX = [
  { feature: 'Gender', targetCorrelation: 0.68, risk: 'High' },
  { feature: 'Zip Code', targetCorrelation: 0.45, risk: 'Medium' },
  { feature: 'Age', targetCorrelation: 0.22, risk: 'Low' },
  { feature: 'Experience', targetCorrelation: 0.81, risk: 'Valid' },
  { feature: 'Education', targetCorrelation: 0.75, risk: 'Valid' },
];
