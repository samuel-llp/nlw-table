let participants = [
  {
    name: "Samuel Lopes",
    email: "samuel@gmail.com",
    dateInscription: new Date(2024, 2, 22, 19, 20),
    dateCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    name: "Henrique Rocca",
    email: "henrique@gmail.com",
    dateInscription: new Date(2024, 1, 02, 16, 30),
    dateCheckIn: null
  },
  {
    name: "Vitoria Almeida",
    email: "vitoria@gmail.com",
    dateInscription: new Date(2024, 0, 15, 10, 45),
    dateCheckIn: new Date(2024, 0, 20, 14, 30)
  },
  {
    name: "Carlos Oliveira",
    email: "carlos@gmail.com",
    dateInscription: new Date(2024, 3, 03, 08, 15),
    dateCheckIn: new Date(2024, 3, 08, 10, 00)
  },
  {
    name: "Ana Santos",
    email: "ana@gmail.com",
    dateInscription: new Date(2024, 4, 12, 14, 20),
    dateCheckIn: new Date(2024, 4, 17, 17, 45)
  },
  {
    name: "Lucas Vieira",
    email: "lucas@gmail.com",
    dateInscription: new Date(2024, 5, 28, 09, 00),
    dateCheckIn: new Date(2024, 6, 02, 12, 10)
  },
  {
    name: "Patricia Costa",
    email: "patricia@gmail.com",
    dateInscription: new Date(2024, 7, 10, 18, 30),
    dateCheckIn: null
  },
  {
    name: "Gabriel Bessi",
    email: "gabriel@gmail.com",
    dateInscription: new Date(2024, 8, 06, 13, 45),
    dateCheckIn: null
  },
  {
    name: "Fernanda Almeida",
    email: "fernanda@gmail.com",
    dateInscription: new Date(2024, 9, 18, 11, 10),
    dateCheckIn: new Date(2024, 9, 23, 14, 25)
  },
  {
    name: "Ricardo Sousa",
    email: "ricardo@gmail.com",
    dateInscription: new Date(2024, 10, 30, 17, 55),
    dateCheckIn: new Date(2024, 11, 04, 20, 30)
  }
];

const creatNewParticipant = (participant) => {
  const dateInscription = dayjs(Date.now())
  .to(participant.dateInscription)

  let dateCheckIn = dayjs(Date.now())
  .to(participant.dateCheckIn)

  if(participant.dateCheckIn == null ) {
    dateCheckIn = `
      <button
        data-email="${participant.email}"
        onclick="makeCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
    <tr>
      <td>
        <strong>
          ${participant.name}
        </strong>
        <br>
        <small>
          ${participant.email}
        </small>
      </td>
      <td>${dateInscription}</td>
      <td>${dateCheckIn}</td>
    </tr>
  `
}

const updateList = (participants) => {
  let output = ""
  // loop // cria obj participante de participantes 
  for(let participant of participants) {
    // output (saída) + participantes da lista, retorna loop
    output = output + creatNewParticipant(participant)
  }

  // seleciona o tbody e transforma em alo
  document
  .querySelector('tbody')
  .innerHTML = output
}

updateList(participants)

const addParticipant = (event) => {
  // cancela o evento padrão do navegador de executar a chamada
  event.preventDefault()

  // cria o obj que coleta as infos do form no html
  // através do elemento que desencadeia (forms)
  const formData = new FormData(event.target)

  const participant = {
    name: formData.get('name'),
    email: formData.get('email'),
    dateInscription: new Date(),
    dateCheckIn: null
  }

  const verifyParticipant = participants.find(
    (p) => p.email == participant.email
  )

  if(verifyParticipant) {
    alert('E-mail já cadastrado.')
    return
  }


  // adiciona os dados do input na lista de let participants
  participants = [participant, ...participants]
  updateList(participants)

  event.target.querySelector('[name="name"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const makeCheckIn = (event) => {
  const confirmationMessage = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(confirmationMessage) == false) {
    return
  }

  // procura da lista inteira o evento desencadeado, verifica se o email selecionado é o mesmo do desencadeado 
  const participant = participants.find(
    (p) => p.email == event.target.dataset.email
  )
  participant.dateCheckIn = new Date()

  updateList(participants)
}