import TextField from "@mui/material/TextField";
import HOC from "../../hoc/HigherOrderComponent";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";

const language = [
  {
    value: "English",
    label: "English",
  },
  {
    value: "Hindi",
    label: "Hindi",
  },
  {
    value: "Hinglish",
    label: "Hinglish",
  },
];

const tones = [
  {
    value: "Formal",
    label: "Formal",
  },
  {
    value: "Informal",
    label: "Informal",
  },
];

function HomeComponent() {
  const [greet, setGreet] = useState({
    name: "",
    language: "English",
    tone: "formal",
  });
  const [loading, setLoading] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");

  const updateGreet = (key, value) => {
    setGreet((prev) => ({ ...prev, [key]: value }));
  };
  const handleGenerate = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/v1/gemini/generate", greet, {
        withCredentials: true,
      })
      .then((res) => {
        setGreetingMessage(res.data.data);
      })
      .finally(() => setLoading(false));
  };
  return (
    <section className="grid grid-cols-2 items-center gap-8">
      <form
        className="flex flex-col self-start max-w-[400px] w-full border border-yellow-500/50 rounded-2xl gap-8 mt-10 items-center bg-black/50 p-5 [&_option]:text-black "
        onSubmit={(e) => handleGenerate(e, greet)}
      >
        <TextField
          id="outlined-basic"
          label="Receipt Name"
          variant="outlined"
          value={greet.name}
          onChange={(e) => updateGreet("name", e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px", // rounded corners
              "& fieldset": {
                borderColor: "white", // normal border
              },
              "&:hover fieldset": {
                borderColor: "yellow", // hover border color
                borderWidth: 2,
              },

              "&.Mui-focused fieldset": {
                borderColor: "blue", // focus border color
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fff", // label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff", // label color on focus
            },
            "& input": {
              color: "white",
            },
            width: "100%", // fixed width
          }}
        />
        <TextField
          id="outlined-select-currency-native"
          select
          label="Language"
          slotProps={{
            select: {
              native: true,
            },
          }}
          value={greet.language}
          onChange={(e) => updateGreet("language", e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px", // rounded corners
              "& fieldset": {
                borderColor: "white", // normal border
              },
              "& select": {
                color: "white",
              },
              "&:hover fieldset": {
                borderColor: "yellow", // hover border color
                borderWidth: 2,
              },

              "&.Mui-focused fieldset": {
                borderColor: "blue", // focus border color
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fff", // label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff", // label color on focus
            },
            "& input": {
              color: "white",
            },
            width: "100%", // fixed width
          }}
        >
          {language.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-tone"
          select
          label="Tone"
          slotProps={{
            select: {
              native: true,
            },
          }}
          // helperText="Please select your Tone"
          value={greet.tone}
          onChange={(e) => updateGreet("tone", e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px", // rounded corners
              "& fieldset": {
                borderColor: "white", // normal border
              },
              "& select": {
                color: "white",
              },
              "&:hover fieldset": {
                borderColor: "yellow", // hover border color
                borderWidth: 2,
              },

              "&.Mui-focused fieldset": {
                borderColor: "blue", // focus border color
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fff", // label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff", // label color on focus
            },
            "& input": {
              color: "white",
            },
            width: "100%", // fixed width
          }}
        >
          {tones.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button
          fullWidth
          sx={{}}
          className="flex gap-3"
          variant="contained"
          type="submit"
        >
          {loading && <span className=" animate-spin text-xl">&#9692;</span>}{" "}
          Generate
        </Button>
      </form>
      <style>
        {`
          .scrollbar-hidden::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {greetingMessage && (
        <div className="mt-30 rounded-xl border border-white/10 backdrop:blur-3xl bg-white/10">
          <div className="font-dosis bg-local scrollbar-hidden overflow-y-auto max-h-[400px] bg-blue-500 py-10 px-5 bg-clip-text text-transparent bg-linear-to-r from-[#fffdfd] via-red-500 to-yellow-500 text-xl ">
            {greetingMessage}
          </div>
        </div>
      )}
    </section>
  );
}
export default HOC(HomeComponent);
