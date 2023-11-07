import Calculator from './calculator/state/context.tsx';

import Display from './components/Display.tsx';
import Button from './components/Button.tsx';

export default function App() {
	return (
		<div className="App">
			<Calculator>
				<Display />
				<div id="buttons">
					<Button functional="clear" />
					{/* <Button functional="parenthesis" /> */}
					<Button functional="erase" />
					<Button operator="divide" />

					<Button digit="seven" />
					<Button digit="eight" />
					<Button digit="nine" />
					<Button operator="multiply" />

					<Button digit="four" />
					<Button digit="five" />
					<Button digit="six" />
					<Button operator="subtract" />

					<Button digit="one" />
					<Button digit="two" />
					<Button digit="three" />
					<Button operator="add" />

					{/* <Button functional="sign" /> */}
					<Button digit="zero" />
					<Button functional="decimal" />
					<Button functional="equals" />
				</div>
			</Calculator>
		</div>
	);
}
