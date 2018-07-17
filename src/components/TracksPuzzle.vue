<template>
  <div>
    <h3>  {{content.title}} </h3>
    <div class="description-bloc">
      <div class="short-description">{{content.shortDescription}}</div>
      <div class="description">{{content.stepDescription}}</div>
      <div class="info">{{content.info}}</div>
      <div class="puzzle">
        <div  class="col-md-3">
          <draggable class="list-group-up" element="ul" v-model="content.puzzleImage" :options="dragOptions" :move="onMove">
            <transition-group name="no" tag="ul">
              <li class="randomImg" v-for="element in content.puzzleImage" :key="element.order" >
                <img :src="element.image" />
              </li>
            </transition-group>
          </draggable>
        </div>
        <div  class="col-md-3">
          <draggable class="list-group" element="ul" v-model="puzzles" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group type="transition" :name="'flip-list'">
              <li class="randomImg" v-for="item in puzzles" :key="item.order">
                <img :src="item.image" />
              </li>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TracksQcm',
  props: ['content'],
  data () {
    return {
      msg: 'Bienvenue sur la map',
      puzzles: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    }
  },
  /* eslint-disable */
  mounted () {
  },
  /* eslint-enable */
  methods: {
    orderList () {
      this.puzzles = this.puzzles.sort((one, two) => { return one.order - two.order })
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    },
    watch: {
      isDragging (newValue) {
        if (newValue) {
          this.delayedDragging = true
          return
        }
        this.$nextTick(() => {
          this.delayedDragging = false
        })
      }
    }
  },
  components: {
    draggable
  }
}
</script>

<style scoped>

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.list-group-up .col-md-3{
  background-color: #CEFF33;
    margin-left: 3vh;
}

.no-move {
  transition: transform 0s;
}

.randomImg {
  margin: 0.25vh;
  list-style: none;
  display: inline;
}

.randomImg img{
  width: 15vh;
  height: 10vh;
  margin-top: 0.2vh;
}
</style>
