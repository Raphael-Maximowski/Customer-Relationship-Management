<template>
  <div class="main">
    <div class="setteam" v-if="trade"><img style="cursor: pointer" @click="SetPeopleToTeam" src="../../assets/images/ExtraFeatures/set.png"></div>
    <ModalContato
        v-if="teams == true"
        :team = teams
        @returnteam="returnteam"
        @IdTeam="IdTeam"
    />
    <chat v-if="chat"
    @CloseChat="active_chat"

/>
    <div><MenuDash @active_chat="active_chat"/></div>
    <Alert v-if="this.pass = false"  :errors="errors"/>
    <div><Blocker v-if="team == null && admin == 0"/></div>
    <div class="content" v-if="admin == 1">
      <div class="welcome1">
        <div class="title1">
          <h1>Team CRM 3C+</h1>
          <p>Configure seus times de forma dinamica</p>
        </div>
        <div v-if="team== null"  class="create"><p style="color: white; cursor:pointer ; font-size: 17px; font-weight: normal" @click="ActiveModal">Criar Team</p></div>
      </div>
      <div class="main-content" v-if="team != null && admin === 1">
        <div class="content1">
          <div class="centercontent">
            <div class="info1">
              <div class="busca">
                <div class="headerlist">Adicione um Usuario no seu Time</div>
                <div class="inputsearch">
                  <input v-model="usersearch" placeholder="Insira o e-mail do seu funcionário">
                  <img @click="SearchUser" src="../../assets/images/DashBoard/lupa.png">
                </div>
                <div class="cardssearch">
                  <div v-for="(user, index) in users.users" :key="index">
                    <find-worker @MakeChange="MakeChange" :user="user"/>
                  </div>
                </div>
                <div class="bottomlist"></div>
              </div>
            </div>
            <div  class="info2">
              <div style="padding-bottom: 10px" class="headerlist">
                <h1>Informações da Empresa</h1>
                </div>
              <div class="flexboxinfo">
                <div>
                  <div class="contentcompany">
                    <h3>Nome</h3>
                    <p>{{ companydata.nome }}</p>
                  </div>
                  <div class="contentcompany">
                    <h3>Razão <br> Social</h3>
                    <p style="margin-top: 7px">{{ companydata.razao }}</p>
                  </div>
                  <div class="contentcompany">
                    <h3>CNPJ</h3>
                    <p> {{ companydata.cnpj }}</p>
                  </div>
                  <div class="contentcompany">
                    <h3>Inscrição <br> Estadual</h3>
                    <p style="margin-top: 7px"> {{ companydata.inscri_estadual }}</p>
                  </div>
                  <div class="contentcompany">
                    <h3>Fundação</h3>
                    <p> {{ companydata.fundacao}}</p>
                  </div>
                </div>
                <div>
                  <div class="contentcompany">
                    <h3>Usuarios no Time</h3>
                    <p style="margin-top: 10px">Indisponivel</p>
                  </div>
                  <div class="contentcompany">
                    <h3>Usuarios Ativos</h3>
                    <p  style="margin-top: 10px">Indisponivel</p>
                  </div>
                  <div class="contentcompany">
                    <h3>Usuarios Offline</h3>
                    <p  style="margin-top: 10px">Indisponivel</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="content2">
          <div class="list">
            <div class="headerlist" style="padding-top: 6px">Usuarios Inseridos no seu Time</div>
            <div class="contentuser">
              <div v-for="userteam in userinteam">
                <WorkerCards :userteam="userteam"/>
              </div>

            </div>
            <div class="bottomlist"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="comumuser" v-if="admin != 1 && team != null">
      <div>

        <div class="headerlist">Funcionarios Inseridos no seu Time</div>
        <div class="contentcomumuser">
          <div v-for="userteam in userinteam">
            <ComumCard :companydata="companydata" :userteam="userteam"/>
          </div>
        </div>
        <div class="bottomlist"></div>
      </div>

    </div>
  </div>
</template>
<script>
import {defineComponent} from "vue";
import MenuDash from "@/components/DashBoard/Menu.vue";
import ModalContato from "@/components/Funil/CreateContact.vue";
import WorkerCards from "@/components/ExtraFeatures/WorkerCard.vue";
import FindWorker from "@/components/ExtraFeatures/FindWorker.vue";
import {GetCompany, GetDataTime, GetUserEmail, SetTeam, SetUser} from "@/services/HttpService.js";
import {mapGetters, mapMutations} from "vuex";
import Message from "@/components/DashBoard/message.vue";
import ComumCard from "@/components/ExtraFeatures/CardWorker.vue";
import Chat from "@/components/ExtraFeatures/Chat.vue";
import Blocker from "@/components/Blocker.vue";
import Alert from "@/components/Login/Alert.vue";

export default defineComponent({
  components: {Alert, Blocker, Chat, ComumCard, Message, FindWorker, WorkerCards, ModalContato, MenuDash},
  data(){
    return{
      teams: false,
      usersearch: "",
      users: [],
      trade: false,
      userid : "",
      IdTime : "",
      empresa_id : null,
      companydata : {},
      teamdata: {},
      userinteam: {},
      chat : false,
      pass : true,
      errors : []

    }
  },
  methods: {
    active_chat(){
      this.chat = !this.chat
    },
    MakeChange(value){
      this.trade =  !this.trade
      this.userid = value
    },
    ActiveModal(){
      this.teams = !this.teams
    },
    returnteam(){
      this.teams = !this.teams
    },
    IdTeam(value){
      console.log('Evento Recebido!')
      this.IdTime =  value
      console.log("Id do Time", this.IdTime)
    },
    async SearchUser(){
      const data = {
        email : this.usersearch
      }
      if (this.usersearch.length == 0) {
        this.pass = false
        this.errors.push('Insira algum Email')
        setTimeout(() => {
          this.pass = true;
          this.errors = [];
        }, 8000);
      } else {
        const response = await GetUserEmail(data);
        this.users =  response.data
        console.log(this.users);
        if (this.users.users.length == 0){
          this.users = {
            users : [{name: 'Nenhum Usuario Encontrado', email: ""}]
          }
      }
        return response;
      }
    },
    async SetTeamUser(){
      const data = {
        'user_id' : this.user_id,
        'team_id' : this.IdTime,
      }
      const response = await SetUser(data);
      return response;
    },
    async GetTeamData() {
      const data = {
        id: this.team
      }
      const response = await GetDataTime(data);
      this.teamdata =  response.data;
      this.userinteam =  this.teamdata.users
      this.UpdateTeamUsers(this.userinteam)
      this.empresa_id = response.data.empresa_id
      return response
    },
    async GetCompanyView () {
      const data = {
        id : this.empresa_id
      }
      const response =  await GetCompany(data)
      this.companydata =  response.data
      return response;
    },
    async SetPeopleToTeam(){
      const data = {
        'user_id' : this.userid,
        'team_id' : this.team
      }
      const response =  await SetTeam(data);
      return response;
    },
    ...mapMutations(['UpdateTeamUsers'])
  },

  watch: {
    IdTime(value){
      if (value != ""){
        this.SetTeamUser();
      }
    }
  },
  created(){
    this.GetTeamData().then(() => {
      this.GetCompanyView();
    })
  },
  computed: {
    ...mapGetters(['user_id', "team", "admin", "team_users"]),
  },
})
</script>
<style>
.contentcomumuser {
  width: 60vw;
  height: 500px;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
}
.comumuser {

  width: 95.7vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.setteam img {
  width: 30px;
  height: 30px;
}
.setteam {
  position: absolute;

  display: flex;
  justify-content: center;
  margin-top: 25vw;

  margin-left: 53.5vw;
}
.inputsearch img {
  width: 15px;
  margin-top: 20px;
  margin-left: 36.5vw;
  position: absolute;
}
.cardssearch {
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  background-color: white;
  height: 20vh;
  overflow-y: auto;
}
.flexboxinfo {
  display: flex;
  background-color: white;
}
.contentcompany {
  margin: 5px 20px;
  display: flex;
  width: 20vw;
  margin-top: 12px;
}

.contentcompany h3 {
  font-size: 14px;
  font-weight: bold;
  width: 5vw;

}

.contentcompany p {
  font-size: 14px;
  font-style: italic;
  margin-left: 10px;
  padding: 0px;
  margin: 0px;
}
.info2 h1 {
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
}
.inputsearch {
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  display: flex;
  background-color: white;
}

.inputsearch input {
  width: 38vw;
  margin: 0.5vw;
  padding: 7px 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  font-size: 13px;
}

input:focus {
  box-shadow: none;
}

.buscaheader {

  height: 40px;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  color: #222738;
  font-size: 18px;
  font-weight: bold;
}
.info1 {
  height: 40.5vh;

}
.info2 {
  height: 40.5vh;
  border: 3px solid #FEBC28;
  border-radius: 10px;
}

.centercontent {
  width: 40vw;
  height: 81vh;
}

.contentuser {
  height: 69.5vh;
  overflow-y: auto;
  background-color: white;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
}

.bottomlist {
  background-color: #FEBC28;
  height: 40px;
  border-radius: 0px 0px 6px 6px;
}

.headerlist {
  background-color: #FEBC28;
  height: 40px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px 6px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

}
.list {
  height: 80vh;
  width: 30vw;
  border-radius: 10px;

}

.content1 {
  width: 48.05vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
.content2{
  width: 48.05vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
}


.main-content {
  width: 96.1vw;
  height: 88.4vh;
  display: flex;
  overflow: hidden;
}
.title1 {
  width: 72vw;
  margin-left: 15px;
}
.create {
  margin-top: 10px;
  height: 70px;
  width: 26.2vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.create p {
  background-color: blue;
  padding: 5px 40px;
  border-radius: 10px;
}
.main {
  display: flex;
  overflow: hidden;

}
.welcome1 {
  width: 54vw;
  display: flex;

  padding-top: 5px;
  width: 100vw;
}

.welcome1 h1 {
  font-size: 20px;
  margin-left: 3vw;

  color: #222738;
  font-weight: bold;
}
.welcome1 p {
  margin-left: 3vw;
  font-size: 15px;
  color: #222738;
  font-weight: bold;
}

.content {
  width: 100vw;
  height: 100vh;
  background-color: #F9FAFC;
}

</style>