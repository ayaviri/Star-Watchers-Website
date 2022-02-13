import React, { Component } from 'react';

class Search extends Component {
    state = {
        value: ''
    };

    getInput = (val) => {
        console.log(val.target.value);
        this.setState({ value: val.target.value });
    }

    handleSearch = () => {
        this.props.handleResult(JSON_DATA);
    };

    render() {
        return (
            <div>
                <h2> Input Search Term:</h2>
                <input type="text" onChange={this.getInput} />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default Search;

const JSON_DATA = {
    sites: [
      {
        name: 'Tumblr',
        link: 'https://www.tumblr.com/tagged/fnaf?sort=top',
        posts: [
          {
            name: 'Found some of my pens, so have some withered animatronics (some personal favorite designs).',
            link: 'https://doberart.tumblr.com/post/676028346847641600/found-some-of-my-pens-so-have-some-withered'
          },
          {
            name: 'Tiny Glam Freddy design for a keychain or sticker debating currently',
            link: 'https://fightingfazbears.tumblr.com/post/676029669074747392/tiny-glam-freddy-design-for-a-keychain-or-sticker'
          },
          {
            name: 'I drew fanarts of fnaf security breach!!',
            link: 'https://gorusiti7.tumblr.com/post/676024694943744000/i-drew-fanarts-of-fnaf-security-breach'
          },
          {
            name: 'I just wanna doodle the Daycare Attendant from FNAF Security Breach, they are my latest comfort character.  Have some doodles of...',
            link: 'https://thedenofravenpuff.tumblr.com/post/676018431955468288/i-just-wanna-doodle-the-daycare-attendant-from'
          },
          {
            name: 'To accompany yesterday\'s edit.\nThis song should not be this good wth I\'m obsessed',
            link: 'https://berrysweetboutique.tumblr.com/post/676013083118977024/to-accompany-yesterdays-edit-this-song-should'
          }
        ]
      },
      {
        name: 'Reddit',
        link: 'https://www.reddit.com/search/?q=fnaf',
        posts: [
          {
            name: 'Who agrees that we need to end William Afton once and for all and add a new fnaf villan?',
            img: 'https://i.redd.it/urz4oilni9a81.png',
            link: 'https://www.reddit.com//r/fivenightsatfreddys/comments/ry6oy2/who_agrees_that_we_need_to_end_william_afton_once/'
          },
          {
            name: 'What direction do you want to see fnaf lean towards in the future? Light and kid friendly like SB or dark and mature like FNAF+?',
            img: 'https://i.redd.it/lqdu9gkz8m981.png',
            link: 'https://www.reddit.com//r/fivenightsatfreddys/comments/rvnuso/what_direction_do_you_want_to_see_fnaf_lean/'
          },
          {
            name: 'Fnaf rule',
            img: 'https://i.redd.it/ht4j57yhkxc81.png',
            link: 'https://www.reddit.com//r/196/comments/s8wg5y/fnaf_rule/'
          },
          {
            name: 'So what do you think about the FnaF + character redesigns?',
            img: 'https://i.redd.it/famage6az7g81.jpg',
            link: 'https://www.reddit.com//r/fivenightsatfreddys/comments/slxem5/so_what_do_you_think_about_the_fnaf_character/'
          },
          {
            name: "How I'd want a FNAF crossover to go",
            img: 'https://www.reddit.com/gallery/soelat',
            link: 'https://www.reddit.com//r/FortNiteBR/comments/soelat/how_id_want_a_fnaf_crossover_to_go/'
          }
        ]
      },
      {
        name: 'YouTube',
        link: 'https://www.youtube.com/results?search_query=fnaf',
        posts: [
          {
            link: 'https://www.youtube.com/watch?v=undefined',
            name: 'Five Nights at Freddy&#39;s'
          },
          {
            link: 'https://www.youtube.com/watch?v=ClQ-ymoXJZc',
            name: 'Five Nights at Freddy&#39;s: Security Breach - Part 1'
          },
          {
            link: 'https://www.youtube.com/watch?v=Y_LVpGqMmCs',
            name: 'FNAF Security Breach Unused SURVIVAL MODE | LOST BITS [TetraBitGaming]'
          },
          {
            link: 'https://www.youtube.com/watch?v=mhPxvX0u82A',
            name: 'TO BYŁO DLA MNIE ZA WIELE... FNAF FIVE NIGHTS AT FREDDY&#39;S 2 (odc2)'
          },
          {
            link: 'https://www.youtube.com/watch?v=DbNeWPWt9MQ',
            name: 'Roblox FNAF Security Breach Tycoon'
          }
        ]
      }
    ]
  }