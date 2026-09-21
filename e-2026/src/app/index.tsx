import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { candidates, rawVotes, Position, Candidate, Vote, DepartmentName } from '@/shared/data';
import { SafeAreaView } from 'react-native-safe-area-context';
import DepartmentRow from '@/components/DepartmentRow'; 
import CandidateCard from '@/components/CandidateCard'; 

type ProcessedCandidate = {
  id: string;
  name: string;
  position: Position;
  party: string;
  votes: number;
  percentage: number;
  color: string;
  dob: string;
  birthplace: string;
  education: string;
};

// Official Color Codes for Political Parties
const PARTY_COLORS: Record<string, string> = {
  "Pitit Dessalines": "#ce1126", // Historic Red
  "EDE": "#002060",             // Royal Navy Blue
  "RDNP": "#00a859",            // Organic Green
  "Independent": "#6c757d",     // Neutral Slate
};

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<Position>("President");
  const [selectedDept, setSelectedDept] = useState<DepartmentName | "All">("All");
  
  // Manage the mutable voting timeline simulation records
  const [votesState, setVotesState] = useState<Vote[]>(rawVotes);

  // Appends a new vote targeting the active location context
  const handleCastVote = (candidateName: string, position: Position) => {
    const designatedDept = selectedDept === "All" ? "Ouest" : selectedDept;
    
    const newVote: Vote = {
      id: `v_${Date.now()}`,
      candidateName,
      position,
      department: designatedDept,
      timestamp: new Date().toISOString()
    };
    
    setVotesState((prevVotes) => [...prevVotes, newVote]);
  };

  // Reverts ballot metrics back to default historical data sets
  const handleResetVotes = () => {
    setVotesState(rawVotes);
  };

  // Highly optimized layout reduction pipeline
  const { filteredList, totalCategoryVotes } = useMemo(() => {
    // 1. Isolate entries matching chosen regional department metrics
    const filteredVotes = votesState.filter(v => selectedDept === "All" || v.department === selectedDept);

    // 2. Count frequencies of total accumulation profiles
    const counts = filteredVotes.reduce<Record<string, number>>((acc, vote) => {
      acc[vote.candidateName] = (acc[vote.candidateName] || 0) + 1;
      return acc;
    }, {});

    // 3. Count total aggregate weights for each specific branch position role
    const totalVotesByPosition = filteredVotes.reduce<Record<string, number>>((acc, vote) => {
      acc[vote.position] = (acc[vote.position] || 0) + 1;
      return acc;
    }, {});

    // 4. Transform static configuration parameters with live statistical rows
    const items: ProcessedCandidate[] = candidates.map((c) => {
      const candidateVotes = counts[c.name] || 0;
      const positionTotal = totalVotesByPosition[c.position] || 0;
      const percentage = positionTotal > 0 ? Math.round((candidateVotes / positionTotal) * 100) : 0;

      return {
        id: c.id,
        name: c.name,
        position: c.position,
        party: c.party,
        votes: candidateVotes,
        percentage,
        color: PARTY_COLORS[c.party] || '#6366f1',
        dob: c.dob,
        birthplace: c.birthplace,
        education: c.education,
      };
    });

    // 5. Partition by position and return array arranged in descending sequence (highest rank first)
    const groupByPosition = (pos: Position) =>
      items.filter((item) => item.position === pos).sort((a, b) => b.votes - a.votes);

    return {
      filteredList: {
        President: groupByPosition("President"),
        "Vice Minister": groupByPosition("Vice Minister"),
        Mayor: groupByPosition("Mayor"),
      },
      totalCategoryVotes: totalVotesByPosition[activeTab] || 0
    };
  }, [votesState, selectedDept, activeTab]);

  const visibleLeaderboard = filteredList[activeTab];
  const tabs: Position[] = ["President", "Vice Minister", "Mayor"];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Structural Header Grid */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Haiti Prevision 2026</Text>
          <Text style={styles.headerSubtitle}>
            {selectedDept === "All" ? "National Projection Metrics" : `${selectedDept} Department Standings`}
          </Text>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetVotes}>
          <Text style={styles.resetButtonText}>Reset Data</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Dynamic Statistics Marquee Banner */}
      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>⚡ Total Tracked Ballots ({activeTab}): </Text>
        <Text style={styles.summaryCount}>{totalCategoryVotes}</Text>
      </View>

      {/* 10 Departments Scrollable Sub-Component */}
      <DepartmentRow selectedDept={selectedDept} onSelectDept={setSelectedDept} />

      {/* Position Role Tab Selection Segment Box */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabButtonText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* High-Fidelity Cards Scrolling Layout Deck */}
      <FlatList
        data={visibleLeaderboard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CandidateCard 
            item={item} 
            index={index} 
            onCastVote={() => handleCastVote(item.name, item.position)} 
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 20, backgroundColor: '#ffffff' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#0f172a', letterSpacing: -0.8 },
  headerSubtitle: { fontSize: 13, color: '#64748b', fontWeight: '500', marginTop: 2 },
  resetButton: { backgroundColor: '#f1f5f9', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  resetButtonText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  summaryBar: { flexDirection: 'row', backgroundColor: '#0f172a', marginHorizontal: 20, marginBottom: 12, padding: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  summaryText: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  summaryCount: { color: '#38bdf8', fontSize: 14, fontWeight: '800' },
  tabContainer: { flexDirection: 'row', backgroundColor: '#f1f5f9', marginHorizontal: 20, marginBottom: 10, padding: 4, borderRadius: 12 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  activeTabButton: { backgroundColor: '#ffffff', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  tabButtonText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  activeTabButtonText: { color: '#0f172a' },
  listContent: { padding: 20, paddingBottom: 40 },
});
