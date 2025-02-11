import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'; 

class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '294417707694-0jalenmo44l1qh5lls72qopdlbtvu2sv.apps.googleusercontent.com',
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });    
    }

    onAuthChange = isSignedIn => isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut();

    onSignInClick = () => window.gapi.auth2.getAuthInstance().signIn();

    onSignOutClick = () => window.gapi.auth2.getAuthInstance().signOut();

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return <button 
                        className="ui red google button"
                        onClick = { this.onSignOutClick }    
                    >
                        <i className="google icon"></i>
                        Sign Out
                    </button>
        } else {
            return <button 
                        className="ui green google button"
                        onClick = { this.onSignInClick }    
                    >
                        <i className="google icon"></i>
                        Sign In with Google
                    </button>
        }
    }

    render() { 
        return ( 
            <div>{ this.renderAuthButton() }</div>
         );
    }
}

const mapStateToProps = state => ({
    isSignedIn: state.auth.isSignedIn
});
 
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);