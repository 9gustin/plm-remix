export const getToken = async(code: string) => {
	const urlencoded = new URLSearchParams()
	urlencoded.append('grant_type', 'authorization_code')
	urlencoded.append('code', code)
	urlencoded.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI as string)
  
	const response = await fetch('https://accounts.spotify.com/api/token',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
		},
		body: urlencoded
	})

	const data = await response.json()

	return data
}
