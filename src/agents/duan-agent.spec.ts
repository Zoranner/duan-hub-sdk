import { AgentOption, OptionItem, OptionType } from './agent-option';
import { AgentType, DuanAgent } from './duan-agent';

describe('DuanAgent', () => {
  const agent = DuanAgent.newInstance('duan-agent', 'DuanAgent', AgentType.Entity);
  for (let index = 0; index < 3; index++) {
    const option = new OptionItem();
    option.name = `agent.option${index}`;
    option.caption = `Option${index}`;
    option.type = OptionType.DoubleRange;
    option.group = `agent.option${index}`;
    option.value = { min: 0.0, max: 10.0, current: { min: 1.0, max: 5.0 } };
    option.display = { factor: 1, unit: 'km' };
    agent.inputs.addGroup(option.name, option.caption);
    agent.inputs.addOption(option);
  }
  for (let index = 0; index < 3; index++) {
    const option = new OptionItem();
    option.name = `agent.option${index}`;
    option.caption = `Option${index}`;
    option.type = OptionType.Vector3;
    option.group = `agent.option${index}`;
    option.value = { current: { x: 1.0, y: -5.0, z: 5.6 } };
    option.display = { factor: 1, unit: 'km' };
    agent.outputs.addGroup(option.name, option.caption);
    agent.outputs.addOption(option);
  }
  // const agentJson = agent.toJSON();
  console.log(agent);
  const agentJson = JSON.stringify(agent);
  console.log(agentJson);
  const agent2 = JSON.parse(agentJson) as DuanAgent;
  console.log(agent2);
  const agentJson2 = JSON.stringify(agent2);
 
  it('should be defined', () => {
    expect(agentJson2).toBe(agentJson);
  });
});
