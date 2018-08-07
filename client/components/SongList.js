import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo';

const query = gql`
    {
        songs {
            title
            id
        }
    }
`;                                                                                            
class SongList extends Component {

    renderSongs() {
        <Query query={query}>
            {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.songs.map(({ id, title }) => (
                <li key={id} className="collection-item">
                    {title}
                </li>
            ));
            }}
        </Query>
    }

    render() {
        return (
            <ul className="collection">
                {this.renderSongs()}
            </ul>
        )
    }
}



export default graphql(query)(SongList);