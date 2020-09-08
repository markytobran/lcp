  <template>
  <div class="title">
    <h2>
      E
      <span>-</span> Z Loans
    </h2>
    <hr />
  </div>
</template>

<style lang="scss" scoped>
$pink: #ffb7c5;

.title {
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;

  & span {
    color: $pink;
  }

  & hr {
    background: linear-gradient(135deg, $pink 50%, #999);
    width: 10rem;
    height: 8px;
    border: none;
  }
}
</style>