import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addLead } from '../../actions/leads';
import PropTypes from 'prop-types';

export class Form extends Component {
	static propTypes = {
		addLead: PropTypes.func.isRequired,
	};

	state = {
		name: '',
		email: '',
		message: '',
	};

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onSubmit = (event) => {
		event.preventDefault();
		const { name, email, message } = this.state;
		this.props.addLead({
			name,
			email,
			message,
		});
		this.setState({
			name: '',
			email: '',
			message: '',
		});
	};

	render() {
		const { name, email, message } = this.state;

		return (
			<div className="card card-body mt-4 mb-4">
				<h1>Add Lead</h1>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Name</label>
						<input
							className="form-control"
							type="text"
							name="name"
							onChange={this.onChange}
							value={name}
							autoFocus
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							className="form-control"
							type="email"
							name="email"
							onChange={this.onChange}
							value={email}
						/>
					</div>
					<div className="form-group">
						<label>Message</label>
						<input
							className="form-control"
							type="text"
							name="message"
							onChange={this.onChange}
							value={message}
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	addLead: (lead) => dispatch(addLead(lead)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);