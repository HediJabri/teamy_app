<script>
export default {
  name: 'CardActivityWrapper',
  functional: true,
  props: {
    activity: {
      type: Object,
      required: true
    }
  },
  render: function(createElement, { props }) {
    function appropriateActivityComponent() {
      const category = props.activity.category
      const activitySwitch = key =>
        ({
          new_event: 'card-activity-event',
          new_events_range: 'card-activity-event-range',
          new_result: 'card-activity-result',
          new_competition: 'card-activity-competition',
          new_membership: 'card-activity-membership',
          remove_membership: 'card-activity-membership'
        }[key])
      return activitySwitch(category)
    }
    return createElement(appropriateActivityComponent(), { props })
  }
}
</script>
