import React, { useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import TagInput from 'react-native-tags-input';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_TVSERIES = gql`
  mutation AddTvSeries(
    $title: String
    $overview: String
    $poster_path: String
    $popularity: Float
    $tags: [String]
  ) {
    addTvSeries(
      tvSeries: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const GET_FIVE_TVSERIES = gql`
  {
    tvSeries(limit: 5) {
      _id
      title
      poster_path
      popularity
      tags
    }
  }
`;

const GET_TVSERIES = gql`
  {
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const AddFormTv = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [popularity, setPopularity] = useState('');
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: [],
  });
  const [tagsText, setTextTags] = useState('#fff');

  const [titleRequired, setTitleRequired] = useState('#5D92B1');
  const [overviewRequired, setOverviewRequired] = useState('#5D92B1');
  const [posterPathRequired, setPosterPathRequired] = useState('#5D92B1');
  const [popularityRequired, setPopularityRequired] = useState('#5D92B1');
  const [tagsRequired, setTagsRequired] = useState('#5D92B1');

  const [addTvSeries] = useMutation(ADD_TVSERIES, {
    update(cache, { data: { addTvSeries } }) {
      const { tvSeries } = cache.readQuery({ query: GET_FIVE_TVSERIES });
      cache.writeQuery({
        query: GET_FIVE_TVSERIES,
        data: { tvSeries: [addTvSeries, ...tvSeries] },
      });
      const { tvSeries: allTvSeries } = cache.readQuery({
        query: GET_TVSERIES,
      });
      cache.writeQuery({
        query: GET_TVSERIES,
        data: { tvSeries: [addTvSeries, ...allTvSeries] },
      });
    },
  });

  const onSubmitAddMovie = () => {
    if (
      title === '' ||
      overview === '' ||
      posterPath === '' ||
      popularity === '' ||
      tags === []
    ) {
      if (title === '') {
        setTitleRequired('red');
      }
      if (overview === '') {
        setOverviewRequired('red');
      }
      if (posterPath === '') {
        setPosterPathRequired('red');
      }
      if (popularity === '') {
        setPopularityRequired('red');
      }
      if (tags.tagsArray.length === 0) {
        setTagsRequired('red');
      }
    } else {
      addTvSeries({
        variables: {
          title,
          overview,
          poster_path: posterPath,
          popularity: Number(popularity),
          tags: tags.tagsArray,
        },
      });
      setTitle('');
      setOverview('');
      setPosterPath('');
      setPopularity('');
      setTags({
        tag: '',
        tagsArray: [],
      });
      setModalVisible(!modalVisible);
    }
  };

  const updateTagState = state => {
    setTags(state);
  };

  const resetState = () => {
    setTitleRequired('#5D92B1');
    setOverviewRequired('#5D92B1');
    setPosterPathRequired('#5D92B1');
    setPopularityRequired('#5D92B1');
    setTagsRequired('#5D92B1');
    setTitle('');
    setOverview('');
    setPosterPath('');
    setPopularity('');
    setTags({
      tag: '',
      tagsArray: [],
    });
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View
          style={{
            marginTop: 22,
            width: '70%',
            alignSelf: 'center',
            backgroundColor: 'white',
            padding: 30,
            borderRadius: 15,
            borderColor: '#5D92B1',
            borderWidth: 2,
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                resetState();
              }}
              style={{ alignSelf: 'flex-end' }}
            >
              <Text style={{ color: '#5D92B1', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Text
              style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20 }}
            >
              Add Tv Series
            </Text>
            <TextInput
              style={{
                height: 30,
                width: '100%',
                borderColor: titleRequired,
                borderWidth: 1,
                marginBottom: 15,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onChangeText={text => setTitle(text)}
              value={title}
              placeholder='Tv Series Title'
            />

            <TextInput
              style={{
                height: 30,
                width: '100%',
                borderColor: overviewRequired,
                borderWidth: 1,
                marginBottom: 15,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onChangeText={text => setOverview(text)}
              value={overview}
              placeholder='Tv Series Overview'
            />

            <TextInput
              style={{
                height: 30,
                width: '100%',
                borderColor: posterPathRequired,
                borderWidth: 1,
                marginBottom: 15,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onChangeText={text => setPosterPath(text)}
              value={posterPath}
              placeholder='Tv Series Poster Path'
            />

            <TextInput
              style={{
                height: 30,
                width: '100%',
                borderColor: popularityRequired,
                borderWidth: 1,
                marginBottom: 15,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onChangeText={text => setPopularity(text)}
              value={popularity}
              placeholder='Tv Series Popularity'
            />

            <TagInput
              updateState={updateTagState}
              tags={tags}
              placeholder='Tags...'
              leftElement={<Icon name='tag-multiple' color={tagsText} />}
              leftElementContainerStyle={{ marginLeft: 3 }}
              containerStyle={{ width: Dimensions.get('window').width - 170 }}
              inputContainerStyle={[
                styles.textInput,
                { borderColor: tagsRequired },
              ]}
              inputStyle={{ color: tagsText }}
              onFocus={() => {
                setTextTags('black');
              }}
              onBlur={() => {
                setTextTags('#5D92B1');
              }}
              autoCorrect={false}
              tagStyle={styles.tag}
              tagTextStyle={styles.tagText}
            />

            <Text style={{ color: '#5D92B1', marginBottom: 8 }}>
              All fields are required.
            </Text>

            <TouchableOpacity
              onPress={() => {
                onSubmitAddMovie();
              }}
              style={{
                backgroundColor: '#5D92B1',
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white' }}>Add Tv Series</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          backgroundColor: '#5D92B1',
          padding: 10,
          marginTop: 15,
          marginBottom: 25,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white' }}>Add Tv Series</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddFormTv;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
  },
  tag: {
    backgroundColor: '#5D92B1',
  },
  tagText: {
    color: 'white',
  },
});
