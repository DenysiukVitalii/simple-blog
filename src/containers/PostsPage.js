import { connect } from 'react-redux';
import PostsPage from '../components/PostsPage';
import { fetchPosts, deletePost} from '../actions/posts';
import { setDateFilter, setPopularFilter, setAlphabetFilter } from '../actions/filters'; 
import { FILTER_DATE, FILTER_POPULAR, FILTER_ALPHABET } from '../types'; 

const sortByDate = (a, b) => {
    return +new Date(b.date) - +new Date(a.date)
};
const sortByPopular = (a, b) => b.views - a.views;
const sortByAlphabet = (a, b) => a.title.localeCompare(b.title);

const sortedPosts = (sortBy, posts) => {
  switch (sortBy) {
    case FILTER_DATE: return [...posts.sort(sortByDate)];
    case FILTER_POPULAR: return [...posts.sort(sortByPopular)];
    case FILTER_ALPHABET: return [...posts.sort(sortByAlphabet)];
    default: return posts.sort(sortByDate);
  }
};

function mapStateToProps(state) {
    return {
        posts: sortedPosts(state.get('filters'), state.get('posts'))
    }
}

export default connect(mapStateToProps, 
                        { fetchPosts, deletePost, setDateFilter, 
                          setPopularFilter, setAlphabetFilter })(PostsPage);