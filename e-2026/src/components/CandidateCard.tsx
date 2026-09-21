import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  type DimensionValue,
} from 'react-native';

type ProcessedCandidate = {
  id: string;
  name: string;
  party: string;
  votes: number;
  percentage: number;
  color: string;
  dob: string;
  birthplace: string;
  education: string;
};

type CandidateCardProps = {
  item: ProcessedCandidate;
  index: number;
  onCastVote: () => void;
};

export default function CandidateCard({
  item,
  index,
  onCastVote,
}: CandidateCardProps) {
  // Get the candidate's first initial for the avatar placeholder.
  const candidateInitials = item.name ? item.name.charAt(0) : '?';

  // Keep the progress bar percentage between 0 and 100.
  const progressWidth: DimensionValue =
  `${Math.max(0, Math.min(100, item.percentage))}%`;

  return (
    <View style={styles.card}>
      {/* 1. Header: Candidate identity and ranking */}
      <View style={styles.cardHeader}>
        <View style={styles.identityLeft}>
          {/* Candidate rank */}
          <View
            style={[
              styles.rankBadge,
              index === 0 && styles.winnerRankBadge,
            ]}
          >
            <Text
              style={[
                styles.rankText,
                index === 0 && styles.winnerRankText,
              ]}
            >
              {index === 0 ? '👑' : `#${index + 1}`}
            </Text>
          </View>

          {/* Candidate initials avatar */}
          <View
            style={[
              styles.avatarPlaceholder,
              {
                backgroundColor: `${item.color}15`,
                borderColor: `${item.color}30`,
              },
            ]}
          >
            <Text style={[styles.avatarText, { color: item.color }]}>
              {candidateInitials}
            </Text>
          </View>

          {/* Candidate name and party */}
          <View style={styles.nameAndPartyContainer}>
            <Text style={styles.candidateName}>{item.name}</Text>

            <View
              style={[
                styles.partyBadge,
                { backgroundColor: `${item.color}12` },
              ]}
            >
              <Text
                style={[
                  styles.partyBadgeText,
                  { color: item.color },
                ]}
              >
                {item.party}
              </Text>
            </View>
          </View>
        </View>

        {/* Candidate percentage */}
        <View style={styles.percentContainer}>
          <Text style={[styles.percentText, { color: item.color }]}>
            {item.percentage}%
          </Text>
        </View>
      </View>

      {/* 2. Candidate biography */}
      <View style={styles.bioGrid}>
        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>🎂 Date of Birth:</Text>
          <Text style={styles.bioValue}>{item.dob}</Text>
        </View>

        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>📍 Birthplace:</Text>
          <Text style={styles.bioValue}>{item.birthplace}</Text>
        </View>

        <View style={styles.bioRow}>
          <Text style={styles.bioLabel}>🎓 Education:</Text>
          <Text style={styles.bioValue} numberOfLines={1}>
            {item.education}
          </Text>
        </View>
      </View>

      {/* 3. Vote statistics and action button */}
      <View style={styles.cardFooter}>
        <View style={styles.voteStats}>
          <Text style={styles.ballotCountText}>{item.votes}</Text>

          <Text style={styles.ballotLabelText}>
            {item.votes === 1
              ? ' verified ballot'
              : ' verified ballots'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.voteButton,
            { backgroundColor: item.color },
          ]}
          onPress={onCastVote}
          accessibilityRole="button"
          accessibilityLabel={`Cast a ballot for ${item.name}`}
        >
          <Text style={styles.voteButtonText}>+1 Ballot</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Vote distribution progress bar */}
      <View style={styles.trackBackground}>
        <View
          style={[
            styles.trackFill,
            {
              width: progressWidth,
              backgroundColor: item.color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',

    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  // Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
    paddingBottom: 12,
  },

  identityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  rankBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  winnerRankBadge: {
    backgroundColor: '#fef3c7',
  },

  rankText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
  },

  winnerRankText: {
    fontSize: 14,
  },

  // Avatar
  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontSize: 16,
    fontWeight: '800',
  },

  // Candidate name and party
  nameAndPartyContainer: {
    flex: 1,
  },

  candidateName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.4,
  },

  partyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: 'flex-start',
  },

  partyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  // Percentage
  percentContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 8,
  },

  percentText: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },

  // Biography
  bioGrid: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 12,
    marginVertical: 12,
    gap: 6,
  },

  bioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bioLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },

  bioValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },

  // Footer and voting button
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },

  voteStats: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  ballotCountText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },

  ballotLabelText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },

  voteButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
  },

  voteButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },

  // Progress bar
  trackBackground: {
    height: 4,
    backgroundColor: '#f1f5f9',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  trackFill: {
    height: '100%',
  },
});
