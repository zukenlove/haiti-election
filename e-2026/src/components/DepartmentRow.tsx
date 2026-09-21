import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { HAITI_DEPARTMENTS, DepartmentName } from '@/shared/data';

type DepartmentRowProps = {
  selectedDept: DepartmentName | "All";
  onSelectDept: (dept: DepartmentName | "All") => void;
};

export default function DepartmentRow({ selectedDept, onSelectDept }: DepartmentRowProps) {
  return (
    <View style={styles.deptContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.deptScroll}
      >
        {/* National Filter Button */}
        <TouchableOpacity 
          style={[styles.deptPill, selectedDept === "All" && styles.activeDeptPill]}
          onPress={() => onSelectDept("All")}
        >
          <Text style={[styles.deptPillText, selectedDept === "All" && styles.activeDeptPillText]}>
            🌎 National
          </Text>
        </TouchableOpacity>

        {/* 10 Departments Mapping */}
        {HAITI_DEPARTMENTS.map((dept) => (
          <TouchableOpacity 
            key={dept} 
            style={[styles.deptPill, selectedDept === dept && styles.activeDeptPill]}
            onPress={() => onSelectDept(dept)}
          >
            <Text style={[styles.deptPillText, selectedDept === dept && styles.activeDeptPillText]}>
              📍 {dept}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  deptContainer: { 
    backgroundColor: '#ffffff', 
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  deptScroll: { 
    paddingHorizontal: 20, 
    gap: 10 
  },
  deptPill: { 
    backgroundColor: '#f8fafc', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: '#e2e8f0' 
  },
  activeDeptPill: { 
    backgroundColor: '#0f172a', 
    borderColor: '#0f172a' 
  },
  deptPillText: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#475569' 
  },
  activeDeptPillText: { 
    color: '#ffffff' 
  },
});
