import "./Header.css"

const Header = props => { 
    return (
        <header className = "header">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="#000"
      version="1.1"
      viewBox="0 0 800 800"
    >
      <path fill="none" strokeWidth="1.25" d="M-2.887-1.654h30v30h-30z"></path>
      <path
        fill="#4c4eff"
        fillOpacity="1"
        strokeWidth="13.522"
        d="M455.732 403.027l13.323-30.705-17.74-15.246-33.26 76.655-106.317-91.371 33.26-76.655-17.74-15.246-13.322 30.705-17.74-15.246-19.938 45.95-17.74-15.246-13.323 30.705 17.74 15.246-19.938 45.95 17.74 15.246-13.323 30.705 17.74 15.246 33.261-76.655 106.316 91.371-33.26 76.656 17.74 15.245 13.323-30.704 17.74 15.245 19.938-45.95 17.74 15.246 13.323-30.705-17.74-15.246 19.938-45.95z"
      ></path>
      <text
        xmlSpace="preserve"
        style={{ lineHeight: "1.25" }}
        x="-11.902"
        y="426.186"
        fill="#4c4eff"
        fillOpacity="1"
        strokeWidth="73.275"
        fontFamily="sans-serif"
        fontSize="293.101"
        transform="scale(.7739 1.29216)"
      >
        <tspan
          x="-11.902"
          y="426.186"
          style={{ InkscapeFontSpecification: "Impact" }}
          fill="#4c4eff"
          fillOpacity="1"
          strokeWidth="73.275"
          fontFamily="Impact"
          fontStretch="normal"
          fontStyle="normal"
          fontVariant="normal"
          fontWeight="normal"
        >
          Fit{" "}
        </tspan>
      </text>
      <text
        xmlSpace="preserve"
        style={{ lineHeight: "1.25" }}
        x="642.283"
        y="440.273"
        fill="#4c4eff"
        fillOpacity="1"
        strokeWidth="73.275"
        fontFamily="sans-serif"
        fontSize="293.101"
        transform="scale(.7739 1.29216)"
      >
        <tspan
          x="642.283"
          y="440.273"
          style={{ InkscapeFontSpecification: "Impact" }}
          fill="#4c4eff"
          fillOpacity="1"
          strokeWidth="73.275"
          fontFamily="Impact"
          fontStretch="normal"
          fontStyle="normal"
          fontVariant="normal"
          fontWeight="normal"
        >
          Net
        </tspan>
      </text>
    </svg><h1> <a className = "User-link" href = {props.url} > {props.title} </a> </h1>
        </header>
    ) 

} 

export default Header 
