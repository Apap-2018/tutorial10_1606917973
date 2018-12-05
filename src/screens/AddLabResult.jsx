import React from 'react';
import { Loading } from '../components/Loading';
import { FormAddLabResult } from '../containers/FormAddLabResult';
import { Appointment } from '../utils/Appointment';

export class AddLabResult extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			hasilLab: {
				"jenis" : "",
				"hasil" : "",
				"tanggalPengajuan" : "",
				"pasien" : {
					"id" : 0
				}
			},
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this)

		Appointment.getDetailPasien(this.props.match.params.id).then(response => {
			if (response.status === 200) {
				this.setState({
					loading: false,
					hasilLab: {
						"jenis" : "",
						"hasil" : "",
						"tanggalPengajuan" : "",
						"pasien" : {
							"id" : response.result.id
						}
					},
				})
			} else {
				alert('Data tidak ditemukan')
				this.props.history.push('/all-pasien')
			}
		})

	}

	handleFormSubmit(e) {
		this.setState({
			loading: true
		})

		const data = new FormData(e.target)
		const dataJson = {}

		data.forEach((val, key) => {
			if (val !== "") {
				let name = key.split('.');
				if (name.length > 1) {
					let last = name.pop()
					name.reduce((prev, next) => {
						return prev[next] = prev[next] || {};
					}, dataJson)[last] = val
				} else {
					dataJson[key] = val
				}
			}
		})

		Appointment.addLabResult(dataJson).then(response => {
			if (response.status === 200) {
				this.setState({
					loading: false,
					hasilLab: response.result
				})
				alert(`Sukses menambah hasil lab untuk pasien dengan id ${this.state.hasilLab.pasien.id}`)
			} else {
				this.setState({
					loading: false
				})
				alert(`Gagal menambah hasil lab untuk pasien dengan id ${this.state.hasilLab.pasien.id}`)
			}
		})
	}

	render() {
		if (this.state.loading) {
			return (
				<Loading msg="Fetching Data..." />
			)
		} else {
			return (
				<FormAddLabResult hasilLab={this.state.hasilLab} onSubmit={this.handleFormSubmit} />
			)
		}
	}
}
