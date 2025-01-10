require 'rails_helper'

RSpec.describe 'Auth API', type: :request do
  let(:headers) { { 'Content-Type': 'application/json' } }
  let(:valid_params) do
    {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    }
  end
  let(:invalid_params) do
    {
      name: '',
      email: 'invalid_email',
      password: ''
    }
  end

  describe 'POST /v1/auth' do
    subject { post '/v1/auth', params: params.to_json, headers: headers }

    context 'when the parameters are valid' do
      let(:params) { valid_params }

      it 'registers a new user and returns a success response' do
        expect { subject }.to change(User, :count).by(1)

        expect(response).to have_http_status(:ok)
        expect(json['data']['email']).to eq(valid_params[:email])
      end
    end

    context 'when the parameters are invalid' do
      let(:params) { invalid_params }

      it 'does not register a user and returns an error response' do
        expect { subject }.not_to change(User, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json['errors']).not_to be_empty
      end
    end
  end

  describe 'POST /v1/auth/sign_in' do
    let!(:user) { create(:user, name: 'Test User', email: 'test@example.com', password: 'password123') }
    subject { post '/v1/auth/sign_in', params: params.to_json, headers: headers }

    context 'when the credentials are valid' do
      let(:params) { { email: user.email, password: 'password123' } }

      it 'returns a success response with authentication headers' do
        subject

        expect(response).to have_http_status(:ok)
        expect(response.headers).to include('access-token', 'client', 'uid')
      end
    end

    context 'when the credentials are invalid' do
      let(:params) { { email: user.email, password: 'wrong_password' } }

      it 'returns an unauthorized error' do
        subject

        expect(response).to have_http_status(:unauthorized)
        expect(json['errors']).to include('Invalid login credentials. Please try again.')
      end
    end
  end

  describe 'DELETE /v1/auth/sign_out' do
    let!(:user) { create(:user) }
    let!(:auth_headers) { user.create_new_auth_token }
    subject { delete '/v1/auth/sign_out', headers: auth_headers }

    context 'when the user is signed in' do
      it 'signs the user out and returns a success response' do
        subject

        expect(response).to have_http_status(:ok)
        expect(json['success']).to be_truthy
      end
    end

    context 'when the user is not signed in' do
      let(:auth_headers) { {} }

      it 'returns an unauthorized error' do
        subject

        expect(response).to have_http_status(:not_found)
        expect(json['errors']).to include('User was not found or was not logged in.')
      end
    end
  end
end
