
function GetColour(value) 
{
  if (value != null)
  {
  value = value.toFixed(1);
    if (value < -0.8) {
        return {background: "#ff3333", display: "inline-block"}
    }
    else if (value < -0.6 && value >=-0.8) {
      return {background: "#ff4d4d", display: "inline-block"}
    }
    else if (value < -0.4 && value >=-0.6) {
      return {background: "#ff6666", display: "inline-block"}
    }
    else if (value < -0.2 && value >=-0.4) {
      return {background: "#ff8080", display: "inline-block"}
    }
    else if (value < -0.0 && value >=-0.2) {
      return {background: "#ff9999", display: "inline-block"}
    }
    else if (value > 0.0 && value <=0.2) {
      return {background: "#b3ffb3", display: "inline-block"}
    }
    else if (value > 0.2 && value <=0.4) {
      return {background: "#99ff99", display: "inline-block"}
    }
    else if (value > 0.4 && value <=0.6) {
      return {background: "#80ff80", display: "inline-block"}
    }
    else if (value > 0.6 && value <=0.8) {
      return {background: "#66ff66", display: "inline-block"}
    }
    else if (value > 0.8) {
      return {background: "#4dff4d", display: "inline-block"}
    }
    else {
        return {background: "#b3d9ff", display: "inline-block"}
    }
  }
  else
  {
    return {background: "#b3d9ff", display: "inline-block"}
  }
}

export default GetColour; 