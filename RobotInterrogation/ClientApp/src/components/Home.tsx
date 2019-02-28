import * as React from 'react';
import { Link } from 'react-router-dom';
import { queryList } from '../Connectivity';

interface IState {
    selectedLanguage: string;
    languages?: string[];
}

export class Home extends React.PureComponent<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedLanguage: 'English'
        };
    }

    public componentWillMount() {
        this.getLanguages();
    }

    public render() {
        const languages = this.state.languages;
        let languageSelect;
        if (languages) {
            languageSelect = <select value={this.state.selectedLanguage} onChange={this.handleChange}>
                {languages.map((lang) =>
                    <option key={lang} value={lang}>{lang}</option>
                )};
            </select>;
        } else {
            languageSelect = <p>Loading languages...</p>;
        }

        return <div className="page">
            <h1>Robot Interrogation</h1>
            <p>Can <em>you</em> tell if someone is secretly a robot?</p>

            <p>Play with a friend, either in the same room or via video chat.</p>
            {languageSelect}

            <div className="actionSet">
                <Link to="/about">Information</Link>
                <Link to={`/host/${this.state.selectedLanguage}`}>Start a game</Link>
            </div>
        </div>;
    }

    private handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            selectedLanguage: e.currentTarget.value
        });
    };

    private async getLanguages() {
        const languages: string[] = await queryList('/api/Data/GetLanguages')
        this.setState({ ...this.state, languages });
    }
}
