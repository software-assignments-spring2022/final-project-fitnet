import "./Home.css"
import Header from "./Header"

const Home = () => {
    return (
	<main className="Home">
            <Header
                url="./"
                title="Home"
            />
	    <body className = "btnCont">
			<a href = "/LogIn">
				<div className="btn">
					Log In
				</div>
			</a>
			<a href="/SignUp">
				<div className="btn">
					Sign Up
				</div>
			</a>
	   </body>
    </main>
    )
}

export default Home
