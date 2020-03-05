import React, { useState } from 'react';
import {
  View, StyleSheet, Text, Image, FlatList,
} from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SEPARATOR, BLACK } from '../../styles';

const CHARACTERS = gql`
  query Characters($page: Int!){
    characters(page: $page) {
      info {
        count
      }
      results {
        id
        name
        image
        status
      }
    }
  }
`;

const Loading = () => (
  <View style={styles.loading}>
    <Text>Loading</Text>
  </View>
);

const Error = () => (
  <View style={styles.error}>
    <Text>Error</Text>
  </View>
);

const CharacterItem = React.memo(({ name, image, status }) => (
  <View style={styles.characterRoot}>
    <Image style={styles.characterImage} source={{ uri: image }} />
    <View style={styles.descriptionContainer}>
      <Text style={styles.textHeading}>{name}</Text>
      <Text style={styles.livingStatus}>{`Living:   ${status}`}</Text>
    </View>
  </View>
));

const Separator = () => (
  <View style={styles.separator} />
);

CharacterItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const Characters = () => {
  const {
    loading,
    error,
    data,
    fetchMore,
  } = useQuery(CHARACTERS, {
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
      data={data.characters.results}
      renderItem={({ item }) => (
        <CharacterItem
          name={item.name}
          image={item.image}
          status={item.status}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Separator />}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        const page = (data.characters.results.length / 20) + 1;
        setFetchedPage({ ...fetchedPage, ...{ [page]: true } });
        fetchMore({
          variables: {
            page,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (fetchedPage[page]) {
              return prev;
            }
            if (!fetchMoreResult || !fetchMoreResult.characters.results) return prev;
            return {
              ...prev,
              characters: {
                ...prev.characters,
                results: [...prev.characters.results, ...fetchMoreResult.characters.results],
              },
            };
          },
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterRoot: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 2,
    marginTop: 16,
    marginBottom: 16,
    height: wp('35%'),
  },
  characterImage: {
    flex: 0.5,
  },
  separator: {
    borderColor: SEPARATOR,
    borderWidth: StyleSheet.hairlineWidth,
    width: wp('90%'),
    marginLeft: 8,
    marginRight: 8,
  },
  descriptionContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingStart: 16,
  },
  textHeading: {
    fontSize: 16,
    color: BLACK,
  },
  livingStatus: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default Characters;
