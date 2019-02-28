import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { queryString } from '../Connectivity';

interface IState {
    interviewID?: string;
}

type Props = RouteComponentProps<{ language: string }>

export class Host extends React.PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public componentWillMount() {
        this.query(this.props.match.params.language);
    }

    public render() {
        if (this.state.interviewID !== undefined) {
            return <Redirect to={`/interview/${this.state.interviewID}`} />
        }

        return <div>
            Please wait...
        </div>;
    }

    private async query(language: string) {
        const id = await queryString(`/api/Data/GetNextSessionID/${language}`);
        this.setState({
            interviewID: id,
        });
    }
}
