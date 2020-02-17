import React, { useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TagInput from 'react-native-tags-input';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_MOVIE = gql`
  mutation AddBook(
    $title: String
    $overview: String
    $poster_path: String
    $popularity: Float
    $tags: [String]
  ) {
    addMovie(
      movie: {
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

const GET_FIVE_MOVIES = gql`
  {
    movies(limit: 5) {
      _id
      title
      poster_path
      popularity
      tags
    }
  }
`;

const GET_MOVIES = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const mainColor = '#8b0000';

const AddForm = () => {
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

  const [titleRequired, setTitleRequired] = useState('#8b0000');
  const [overviewRequired, setOverviewRequired] = useState('#8b0000');
  const [posterPathRequired, setPosterPathRequired] = useState('#8b0000');
  const [popularityRequired, setPopularityRequired] = useState('#8b0000');
  const [tagsRequired, setTagsRequired] = useState('#8b0000');

  const [addMovie] = useMutation(ADD_MOVIE, {
    update(cache, { data: { addMovie } }) {
      const { movies } = cache.readQuery({ query: GET_FIVE_MOVIES });
      cache.writeQuery({
        query: GET_FIVE_MOVIES,
        data: { movies: [addMovie, ...movies] },
      });
      const { movies: allMovies } = cache.readQuery({ query: GET_MOVIES });
      cache.writeQuery({
        query: GET_MOVIES,
        data: { movies: [addMovie, ...allMovies] },
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
      addMovie({
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
    setTitleRequired('#8b0000');
    setOverviewRequired('#8b0000');
    setPosterPathRequired('#8b0000');
    setPopularityRequired('#8b0000');
    setTagsRequired('#8b0000');
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
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View
          style={{
            marginTop: 22,
            width: '70%',
            alignSelf: 'center',
            backgroundColor: 'black',
            padding: 30,
            borderRadius: 15,
            borderColor: '#8b0000',
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
              <Text style={{ color: '#8b0000', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 20,
                color: 'white',
              }}
            >
              Add Movie
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
                color: 'white',
              }}
              onChangeText={text => setTitle(text)}
              value={title}
              placeholder='Movie Title'
              placeholderTextColor='#8b0000'
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
                color: 'white',
              }}
              onChangeText={text => setOverview(text)}
              value={overview}
              placeholder='Movie Overview'
              placeholderTextColor='#8b0000'
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
                color: 'white',
              }}
              onChangeText={text => setPosterPath(text)}
              value={posterPath}
              placeholder='Movie Poster Path'
              placeholderTextColor='#8b0000'
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
                color: 'white',
              }}
              onChangeText={text => setPopularity(text)}
              value={popularity}
              placeholder='Movie Popularity'
              placeholderTextColor='#8b0000'
            />

            <TagInput
              updateState={updateTagState}
              tags={tags}
              placeholder='Tags...'
              placeholderTextColor='#8b0000'
              leftElement={<Icon name='tag-multiple' color={tagsText} />}
              leftElementContainerStyle={{ marginLeft: 3 }}
              containerStyle={{ width: Dimensions.get('window').width - 170 }}
              inputContainerStyle={[
                styles.textInput,
                { borderColor: tagsRequired },
              ]}
              inputStyle={{ color: tagsText }}
              onFocus={() => {
                setTextTags('white');
              }}
              onBlur={() => {
                setTextTags('#8b0000');
              }}
              autoCorrect={false}
              tagStyle={styles.tag}
              tagTextStyle={styles.tagText}
            />

            <Text style={{ color: 'red', marginBottom: 8 }}>
              All fields are required.
            </Text>

            <TouchableOpacity
              onPress={() => {
                onSubmitAddMovie();
              }}
              style={{
                backgroundColor: '#8b0000',
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white' }}>Add movie</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          backgroundColor: '#8b0000',
          padding: 10,
          marginTop: 15,
          marginBottom: 25,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white' }}>Add Movie</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
  },
  tag: {
    backgroundColor: '#8b0000',
    color: '#8b0000',
  },
  tagText: {
    color: '#8b0000',
  },
});
