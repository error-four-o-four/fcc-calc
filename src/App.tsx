import Calculator from './calculator/state/context.tsx';

import Display from './components/Display.tsx';
import Button from './components/Button.tsx';

export default function App() {
	return (
		<div className="App">
			<Calculator>
				<Display />
				<div id="buttons">
					<Button action="function" data="clear" text="AC" />
					<Button action="function" data="parenthesis" text="()" />
					<Button action="function" data="erase" text="⌫" />
					<Button action="operator" data="divide" text="÷" />

					<Button action="digit" data="seven" text="7" />
					<Button action="digit" data="eight" text="8" />
					<Button action="digit" data="nine" text="9" />
					<Button action="operator" data="multiply" text="×" />

					<Button action="digit" data="four" text="4" />
					<Button action="digit" data="five" text="5" />
					<Button action="digit" data="six" text="6" />
					<Button action="operator" data="subtract" text="−" />

					<Button action="digit" data="one" text="1" />
					<Button action="digit" data="two" text="2" />
					<Button action="digit" data="three" text="3" />
					<Button action="operator" data="add" text="+" />

					<Button action="function" data="sign" text="±" />
					<Button action="digit" data="zero" text="0" />
					<Button action="function" data="decimal" text="." />
					<Button action="function" data="equals" text="=" />
				</div>
			</Calculator>
		</div>
	);
}
