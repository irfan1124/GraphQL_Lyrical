import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, Query, ApolloConsumer } from 'react-apollo';


const getSongsListQuery = gql`
    {
        songs {
            title
            id
        }
    }
`;   

const getSongQuery = gql` {
    song(id: $id) {
        title
        id
    }
}
`;  

class SongList extends Component {
    constructor() {
        super();
        this.state = {
            song: null
        };
    }

    componentDidMount() {
        console.log('did mount')
    }

    getSong = () => {
        const { data } =  client.query({
                query: getSongQuery,
                variables: { id: 1 }
            });
        this.setState({song: data.song});
    }

    //setSong = song => this.setState({song})


    render() {
        return (
            <div>
                <ul >
                    <Query query={getSongsListQuery} >
                        {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        confirm.log(data, error, loading)
                        return data.songs.map(({ id, title }) => (
                            <li key={id} className="collection-item">
                                {title}
                            </li>
                        ));
                        }}
                    </Query>
                </ul>
                <div>
                    Get first song - <p>{this.state.song}</p>
                    <ApolloConsumer> { client => ( <button 
                        onClick={async () => {
                            const { data } =  client.query({
                                query: getSongQuery,
                                variables: { id: 1 }
                            });
                            this.setState({song: data.song});
                        }}
                    >
                         Click me! </button> 
                    )} 
                    </ApolloConsumer>
                </div>
                <div>
                    Add Song
                    <input ></input>
                </div>
            </div>
        )
    }
}
export default SongList;
