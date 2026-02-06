const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", (req, res) => {
  const { message, step, data } = req.body;

  let reply = "";
  let nextStep = step;
  let updatedData = data || {};

  switch (step) {
    case 0:
      reply = "Hi! 👋 I can help you apply for a loan. What type of loan do you want? (personal / education / home)";
      nextStep = 1;
      break;

    case 1:
      updatedData.loanType = message.toLowerCase();
      reply = "Got it! What is your monthly income (in ₹)?";
      nextStep = 2;
      break;

    case 2:
      updatedData.income = parseInt(message);
      reply = "How much loan amount are you looking for (₹)?";
      nextStep = 3;
      break;

    case 3:
      updatedData.amount = parseInt(message);

      if (updatedData.income >= 20000 && updatedData.amount <= updatedData.income * 20) {
        reply = "✅ You are eligible for the loan! Our team will contact you soon.";
      } else {
        reply = "❌ Sorry, you are currently not eligible based on the provided details.";
      }

      nextStep = 0;
      updatedData = {};
      break;
  }

  res.json({ reply, step: nextStep, data: updatedData });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});