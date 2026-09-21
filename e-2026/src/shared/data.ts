export type Position = "President" | "Vice Minister" | "Mayor";

// 1. Explicitly list the 10 administrative departments of Haiti
export type DepartmentName = 
  | "Artibonite" | "Centre" | "Grand'Anse" | "Nippes" | "Nord" 
  | "Nord-Est" | "Nord-Ouest" | "Ouest" | "Sud" | "Sud-Est";

export const HAITI_DEPARTMENTS: DepartmentName[] = [
  "Artibonite", "Centre", "Grand'Anse", "Nippes", "Nord", 
  "Nord-Est", "Nord-Ouest", "Ouest", "Sud", "Sud-Est"
];

export type Candidate = {
  id: string;
  name: string;
  position: Position;
  party: string;
  dob: string;
  birthplace: string;
  education: string;
};


export type Vote = {
  id: string;
  candidateName: string;
  position: Position;
  department: DepartmentName; // Tracks where the vote was cast
  timestamp: string;
};

export const candidates: Candidate[] = [
  { 
    id: "p1", 
    name: "Jean-Charles Moïse", 
    position: "President", 
    party: "Pitit Dessalines",
    dob: "April 20, 1967", 
    birthplace: "Milot, Nord", 
    education: "State University of Haiti" 
  },
  { 
    id: "p2", 
    name: "Claude Joseph", 
    position: "President", 
    party: "EDE",
    dob: "August 12, 1980", 
    birthplace: "Cap-Haïtien", 
    education: "New School University (PhD)" 
  },
  { 
    id: "p3", 
    name: "Mirlande Manigat", 
    position: "President", 
    party: "RDNP",
    dob: "November 3, 1940", 
    birthplace: "Miragoâne", 
    education: "Sorbonne University (PhD)" 
  },
  { 
    id: "v1", 
    name: "Pierre Garry", 
    position: "Vice Minister", 
    party: "Independent",
    dob: "January 15, 1975", 
    birthplace: "Gonaïves", 
    education: "INAGHEI" 
  },
  { 
    id: "v2", 
    name: "Marie Lamour", 
    position: "Vice Minister", 
    party: "EDE",
    dob: "September 5, 1983", 
    birthplace: "Jacmel", 
    education: "Quisqueya University" 
  },
  { 
    id: "m1", 
    name: "Emmanuel Joseph", 
    position: "Mayor", 
    party: "Pitit Dessalines",
    dob: "June 22, 1988", 
    birthplace: "Port-au-Prince", 
    education: "Faculty of Law (EDSEG)" 
  },
  { 
    id: "m2", 
    name: "Fabienne Denis", 
    position: "Mayor", 
    party: "RDNP",
    dob: "March 11, 1991", 
    birthplace: "Les Cayes", 
    education: "Université Notre Dame d'Haiti" 
  },
];


// Baseline initial votes distributed across different departments
export const rawVotes: Vote[] = [
  { id: "v_1", candidateName: "Jean-Charles Moïse", position: "President", department: "Ouest", timestamp: "2026-09-21T12:00:00Z" },
  { id: "v_2", candidateName: "Claude Joseph", position: "President", department: "Nord", timestamp: "2026-09-21T12:05:00Z" },
  { id: "v_3", candidateName: "Jean-Charles Moïse", position: "President", department: "Artibonite", timestamp: "2026-09-21T12:10:00Z" },
  { id: "v_4", candidateName: "Marie Lamour", position: "Vice Minister", department: "Ouest", timestamp: "2026-09-21T12:15:00Z" },
  { id: "v_5", candidateName: "Fabienne Denis", position: "Mayor", department: "Sud", timestamp: "2026-09-21T12:20:00Z" },
];
