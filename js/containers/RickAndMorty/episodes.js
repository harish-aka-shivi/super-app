import React, { useState } from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { SEPARATOR, BLACK } from '../../styles';

const EPISODES = gql`
  query Episodes($page: Int!){
    episodes(page: $page) {
      results {
        id
        episode
        name
        created
      }
    }
  }
`;

const EpisodeItem = ({ index, episode, name }) => (
  <View style={styles.episodeRoot}>
    <View style={styles.numberContainer}>
      <Text>{index + 1}</Text>
      <Text>{episode}</Text>
    </View>
    <Text style={styles.title}>{name}</Text>
  </View>
);

EpisodeItem.propTypes = {
  index: PropTypes.number.isRequired,
  episode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Separator = () => (
  <View style={styles.separator} />
);

const Episodes = () => {
  const {
    loading,
    error,
    data,
    fetchMore,
  } = useQuery(EPISODES, {
    variables: {
      page: 1,
    },
  });

  const [fetchedPage, setFetchedPage] = useState({});

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <FlatList
      contentContainerStyle={styles.flatList}
      data={data.episodes.results}
      renderItem={({ item, index }) => (
        <EpisodeItem
          index={index}
          name={item.name}
          episode={item.episode}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Separator />}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        const page = (Math.ceil(data.episodes.results.length / 20)) + 1;
        setFetchedPage({ ...fetchedPage, ...{ [page]: true } });
        fetchMore({
          variables: {
            page,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (fetchedPage[page]) {
              return prev;
            }
            if (!fetchMoreResult || !fetchMoreResult.episodes.results) return prev;
            return {
              ...prev,
              episodes: {
                ...prev.episodes,
                results: [...prev.episodes.results, ...fetchMoreResult.episodes.results],
              },
            };
          },
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  episodeRoot: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginEnd: 16,
    alignItems: 'center',
  },
  numberContainer: {
    flexDirection: 'row',
    width: widthPercentageToDP('20%'),
    justifyContent: 'space-between',
    marginRight: 24,
  },
  separator: {
    borderColor: SEPARATOR,
    borderWidth: StyleSheet.hairlineWidth,
    width: widthPercentageToDP('90%'),
    marginTop: 24,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 24,
  },
  title: {
    color: BLACK,
    fontWeight: 'bold',
  },
});

export default Episodes;
